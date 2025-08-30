// route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// ========== RATE LIMIT SETUP ==========
const rateLimitWindow = 60_000; // 1 minute
const maxRequests = 5;           // max per IP per window
const ipStore = new Map<string, { count: number; start: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, start: now });
    return true;
  }

  if (now - entry.start < rateLimitWindow) {
    if (entry.count >= maxRequests) return false;
    entry.count++;
    return true;
  } else {
    // reset window
    ipStore.set(ip, { count: 1, start: now });
    return true;
  }
}
// ======================================

const FormSchema = z.object({
  name: z.string(),
  //email: z.string().optional,
  phoneNo: z.string().min(8).max(14),
  //zipcode: z.string().max(4).optional(),
  plateNo: z.string().max(10).optional(),
  additional: z.string().max(500).optional(),
  partner: z.string().optional(),
  answers: z.record(z.string(), z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1) Get client IP (production and local)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    // 2) Rate limit check
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "For mange forsøg. Vent lidt og prøv igen." },
        { status: 429 }
      );
    }

    // 3) Parse + validate input
    const body = await request.json();
    const { name, phoneNo, plateNo, additional, partner, answers } =
      FormSchema.parse(body);

    // 4) DB logic
    const existing = await sql`SELECT * FROM leads WHERE phone = ${phoneNo}`;
    const answerJson = answers ? sql.json(answers) : null;

    if (existing.length === 0) {
      await sql`
        INSERT INTO leads (
          lead_id, email, name, phone, zipcode, plate, additional, partner, answers, submitted_at
        ) VALUES (
          ${uuidv4()}, ${null}, ${name}, ${phoneNo}, ${null}, ${plateNo ?? null}, ${additional ?? null}, ${partner ?? null}, ${answerJson ?? null}, NOW()
        )
      `;
    } else {
      const existingData = existing[0];
      await sql`
        UPDATE leads SET
          name = ${name},
          email = ${null},
          phone = ${phoneNo ?? existingData.phone},
          zipcode = ${null},
          plate = ${plateNo ?? existingData.plate},
          additional = ${additional ?? existingData.additional},
          partner = ${partner ?? existingData.partner},
          answers = ${answerJson ?? existingData.answers},
          submitted_at = NOW()
        WHERE phone = ${phoneNo}
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
