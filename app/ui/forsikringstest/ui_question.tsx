import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChoiceButton from "./choice_button";
import { Question, QuestionId } from "@/app/lib/forsikringstest_questions";

export default function UiQuestion(currentQuestion: Question, handleChoice: (selectedText: string, nextId: QuestionId | null) => void, history: QuestionId[], goBack: () => void): React.ReactNode {
    return <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[100px] justify-center">
        <div className="w-full md:w-4/5 flex flex-col justify-center ">
            <CardHeader className="m-4 p-0">
                <CardTitle className="leading-5 font-sans">{currentQuestion.question}</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <div className="flex flex-col gap-2">
                    {currentQuestion.options?.map((option, idx) => (
                        <ChoiceButton
                            option={option}
                            key={idx}
                            idx={idx}
                            goToNext={handleChoice} />
                    ))}

                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-end mt-8">
                {history.length > 1 &&
                    <button className="rounded-xl bg-gray-200 hover:bg-gray-300 text-black px-4 py-2" onClick={goBack}>
                        tilbage
                    </button>}
            </CardFooter>
        </div>
    </div>;
}
