import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScoreBar from "./score_bar";
import { questions } from "@/app/lib/civilvognstest_questions";
import Link from 'next/link';

export default function QuizEndCard({ correctCount }: { correctCount: number }) {
  return (
    <div className="flex flex-col justify-evenly items-center gap-6 w-full px-3 mt-6">
      {/* Score Card */}
      <Card className="bg-orange-50 shadow-lg min-w-2/5 w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-base font-serif">Din Score!</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreBar correctCount={correctCount} total={questions.length} />
        </CardContent>
      </Card>

      {/* Sign-up Form Card */}
      <Card className="bg-orange-50 shadow-lg min-w-2/5 w-full max-w-2xl">
        <CardContent>
          {/* Removed temporarily
          <UserForm /> 
          */}
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-2xl text-center font-semibold font-serif">
              Tag næste skridt
            </h2>
            <p className="text-sm text-center font-[family-name:var(--font-geist-sans)]">
              Prøv vores <b>forsikringstest</b> for at se om du er berettiget til gode tilbud hos nogle af vores partnere
            </p>
            <div className="flex flex-col justify-center items-center w-full gap-2  ">
              <Link href={"/forsikringstest"} className=" w-2/3  text-center md:text-[20px] font-medium  py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                Forsikringstest
              </Link>
              <Link
                href={"/"}
                className="text-sm text-gray-600 underline hover:text-black"
              >
                Gå til forsiden
              </Link>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
