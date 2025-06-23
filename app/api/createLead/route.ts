import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNo: z.string().min(8).max(14).optional(),
  address: z.string().min(4).optional(),
  plateNo: z.string().max(10).optional(),
  additional: z.string().max(500).optional(),
  partner: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phoneNo, address, plateNo, additional, partner } = FormSchema.parse(body);

    // Check if user exists by email
    const existing = await sql`
      SELECT * FROM leads WHERE email = ${email}
    `;

    if (existing.length === 0) {
      // No existing entry — insert new
      await sql`
        INSERT INTO leads (
          lead_id, email, name, phone, address, plate, additional, partner, submitted_at
        ) VALUES (
          ${uuidv4()}, ${email}, ${name}, ${phoneNo ?? null}, ${address ?? null}, ${plateNo ?? null}, ${additional ?? null}, ${partner ?? null}, NOW()
        )
      `;
    } else {
      // Existing entry — update fields, only overwrite with provided data (fall back to existing)
      const existingData = existing[0];

      await sql`
        UPDATE leads SET
          name = ${name},
          phone = ${phoneNo ?? existingData.phone},
          address = ${address ?? existingData.address},
          plate = ${plateNo ?? existingData.plate},
          additional = ${additional ?? existingData.additional},
          partner = ${partner ?? existingData.partner},
          submitted_at = NOW()
        WHERE email = ${email}
      `;
    }

    return NextResponse.json({ success: true, message: "Tak for din tilmelding!" });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Noget gik galt" },
      { status: 500 }
    );
  }
}
