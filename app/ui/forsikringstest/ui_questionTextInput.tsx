import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChoiceButton from "./choice_button";
import { Question, QuestionId } from "@/app/lib/forsikringstest_questions";

export default function UiQuestionTextInput(currentQuestion: Question, handleChoice: (selectedText: string, nextId: QuestionId | null) => void, setShowTextField: React.Dispatch<React.SetStateAction<boolean>>, showTextField: boolean, style: string, setTextInput: React.Dispatch<React.SetStateAction<string>>, history: QuestionId[], goBack: () => void, textInput: string, setPlate: React.Dispatch<React.SetStateAction<string>>, plate: string, handleFormStep: (nextId: QuestionId | null) => void): React.ReactNode {
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
                    <>
                        <button
                            key={0}
                            onClick={() => setShowTextField(!showTextField)}
                            className={style}
                        >
                            {currentQuestion.textInputOption}
                        </button>
                        {showTextField && (
                            currentQuestion.id === "carInsurance" ?
                                (
                                    <input
                                        required
                                        name="nummerplade"
                                        placeholder="Nummerplade"
                                        onChange={e => setPlate(e.target.value)}
                                        className="invalid:border-red-800 w-10/11 self-center h-7 bg-white border-1 border-gray-400 p-5 " />
                                ) :
                                (
                                    <input
                                        required
                                        name="øvrig"
                                        placeholder="Uddyb.."
                                        onChange={e => setTextInput(e.target.value)}
                                        className="invalid:border-red-800 w-10/11 self-center h-7 bg-white border-1 border-gray-400 p-5 " />
                                )
                        )}
                    </>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-end mt-8">
                {history.length > 1 &&
                    <button className="rounded-xl bg-gray-200 hover:bg-gray-300 text-black px-4 py-2" onClick={goBack}>
                        tilbage
                    </button>}
                {showTextField &&
                    currentQuestion.id === "carInsurance" ?
                    <button
                        disabled={!plate.length}
                        className={"disabled:bg-gray-500 rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2"}
                        onClick={() => handleFormStep(currentQuestion.textInputNext!)}
                    >
                        bekræft
                    </button>
                    :
                    <button
                        disabled={!textInput.length}
                        className={"disabled:bg-gray-500 rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2"}
                        onClick={() => handleChoice(textInput, currentQuestion.textInputNext!)}
                    >
                        bekræft
                    </button>
                }


            </CardFooter>
        </div>
    </div>;
}

