import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNo: z.string().min(8).max(14),
  zipcode: z.string().min(3).max(4).optional(),
  plateNo: z.string().max(10).optional(),
  additional: z.string().max(500).optional(),
  partner: z.string().optional(),
  answers: z.record(z.string(), z.string()).optional(), // <-- answers as object

});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phoneNo, zipcode, plateNo, additional, partner, answers } = FormSchema.parse(body);
    console.log(name);
    console.log(email);
    console.log(phoneNo);
    console.log(zipcode);
    console.log(plateNo);
    console.log(additional);

    // Check if user exists by email
    const existing = await sql`
      SELECT * FROM leads WHERE email = ${email}
    `;

    const answerJson = answers ? sql.json(answers) : null


    if (existing.length === 0) {
      // No existing entry — insert new
      await sql`
        INSERT INTO leads (
          lead_id, email, name, phone, zipcode, plate, additional, partner, answers, submitted_at
        ) VALUES (
          ${uuidv4()}, ${email}, ${name}, ${phoneNo ?? null}, ${zipcode ?? null}, ${plateNo ?? null}, ${additional ?? null}, ${partner ?? null}, ${answerJson ?? null}, NOW()
        )
      `;
    } else {
      // Existing entry — update fields, only overwrite with provided data (fall back to existing)
      const existingData = existing[0];

      await sql`
        UPDATE leads SET
          name = ${name},
          phone = ${phoneNo ?? existingData.phone},
          zipcode = ${zipcode ?? existingData.address},
          plate = ${plateNo ?? existingData.plate},
          additional = ${additional ?? existingData.additional},
          partner = ${partner ?? existingData.partner},
          answers = ${answerJson ?? existingData.answers},
          submitted_at = NOW()
        WHERE email = ${email}
      `;
    }

    return NextResponse.json({ success: true, message: "Tak for din tilmelding!" });
    //dummy comment
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Noget gik galt" },
      { status: 500 }
    );
  }
}
