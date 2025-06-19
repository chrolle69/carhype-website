import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = FormSchema.parse(body);

    const existing = await sql`
      SELECT * FROM leads WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email findes allerede" },
        { status: 400 }
      );
    }

    const leadId = uuidv4();

    await sql`
      INSERT INTO leads (lead_id, name, email)
      VALUES (${leadId}, ${name}, ${email})
    `;

    return NextResponse.json({ success: true, message: "Tak for din tilmelding!" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Noget gik galt" },
      { status: 500 }
    );
  }
}
