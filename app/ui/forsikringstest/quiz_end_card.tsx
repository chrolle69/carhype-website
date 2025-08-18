import { Card, CardContent } from "@/components/ui/card";
import UserPartnerForm from "./user_partner_form";
import { QuestionId } from "@/app/lib/forsikringstest_questions";

export default function QuizEndCard(props: {
    partner: QuestionId,
    answers: { [question: string]: string }
}) {


    return (
        <div className="w-full px-4 flex flex-col md:flex-row gap-4 items-center justify-center mt-6">


            {/* Sign-up Form Card */}
            <Card className="bg-orange-50 shadow-lg w-full max-w-md">
                <CardContent>
                    <UserPartnerForm partner={props.partner} answers={props.answers} />
                </CardContent>
            </Card>

        </div>
    );
}
