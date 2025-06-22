import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScoreBar from "./score_bar";
import UserForm from "./user_form";
import { questions } from "@/app/lib/civilvognstest_questions";

export default function QuizEndCard({ correctCount }: { correctCount: number }) {
  return (
    <div className="w-full px-4 flex flex-col md:flex-row gap-4 items-center justify-center mt-6">

      {/* Score Card */}
      <Card className="bg-orange-50 shadow-lg w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-base font-serif">Din Score!</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreBar correctCount={correctCount} total={questions.length} />
        </CardContent>
      </Card>

      {/* Sign-up Form Card */}
      <Card className="bg-orange-50 shadow-lg w-full max-w-md">
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>

    </div>
  );
}
