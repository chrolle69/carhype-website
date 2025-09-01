import { Question, QuestionId } from "@/app/lib/forsikringstest_questions";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { PhoneInput } from "react-international-phone";

export default function UiForm(currentQuestion: Question, name: string, setName: React.Dispatch<React.SetStateAction<string>>, history: QuestionId[], goBack: () => void, handleFormStep: (nextId: QuestionId | null) => void, phone: string, setPhone: React.Dispatch<React.SetStateAction<string>>, additional: string, setAdditional: React.Dispatch<React.SetStateAction<string>>, isLoading: boolean, sendData: (nextId: QuestionId | null) => Promise<void>, error: string, message: string): React.ReactNode {
    return currentQuestion.id === 'name' ? (
        <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[100px] justify-center">
            <div className="w-full md:w-4/5 flex flex-col justify-center ">
                <CardHeader className="m-4 p-0">
                    <CardTitle className="leading-5 font-sans">{currentQuestion.question}</CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="flex flex-col gap-2">
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border rounded bg-white" />
                    </div>
                </CardContent>
                <CardFooter className="ml-auto p-5">
                    {history.length > 1 &&
                        <button className="rounded-xl bg-gray-200 hover:bg-gray-300 text-black px-4 py-2" onClick={goBack}>
                            Tilbage
                        </button>}
                    <button
                        disabled={!name.length}
                        className={"disabled:bg-gray-400 rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2"}
                        onClick={() => handleFormStep(currentQuestion.textInputNext!)}
                    >
                        Videre
                    </button>

                </CardFooter>
            </div>
        </div>
    ) : currentQuestion.id == "phoneS" || currentQuestion.id == "phoneL" ? (
        <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[100px] justify-center">
            <div className="w-full md:w-4/5 flex flex-col justify-center ">
                <CardHeader className="m-4 p-0">
                    <CardTitle className="leading-5 font-sans">{currentQuestion.question}</CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="flex flex-col gap-2">
                        <PhoneInput
                            defaultCountry="dk"
                            name="phone"
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                            className="flex self-center p-2 border rounded bg-white" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-end mt-8">
                    {history.length > 1 &&
                        <button className="rounded-xl bg-gray-200 hover:bg-gray-300 text-black px-4 py-2" onClick={goBack}>
                            Tilbage
                        </button>}
                    <button
                        disabled={phone.length < 11}
                        className={"disabled:bg-gray-400 rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2"}
                        onClick={() => handleFormStep(currentQuestion.textInputNext!)}
                    >
                        Videre
                    </button>

                </CardFooter>
            </div>
        </div>
    ) : (currentQuestion.id === "additionalL" || currentQuestion.id === "additionalS") && (
        <div className="flex flex-col md:flex-row md:gap-6 p-4 min-h-[100px] justify-center">
            <div className="w-full md:w-4/5 flex flex-col justify-center ">
                <CardHeader className="m-4 p-0">
                    <CardTitle className="leading-5 font-sans">{currentQuestion.question}</CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="flex flex-col gap-2">
                        <input
                            name="additional"
                            type="text"
                            value={additional}
                            onChange={(e) => setAdditional(e.target.value)}
                            required
                            className="w-full p-2 border rounded bg-white"
                            disabled={isLoading} />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col flex-row justify-between items-center mt-8 gap-2">
                    {history.length > 1 &&
                        <button
                            className="rounded-xl bg-gray-200 hover:bg-gray-300 text-black px-4 py-2"
                            onClick={goBack}
                            disabled={isLoading}
                        >
                            Tilbage
                        </button>}
                    <button
                        className="rounded-xl bg-black hover:bg-gray-600 text-white px-4 py-2 flex items-center justify-center"
                        onClick={() => sendData(currentQuestion.textInputNext!)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="animate-spin border-b-2 border-white rounded-full w-5 h-5 mr-2"></span>
                        ) : null}
                        Modtag Tilbud
                    </button>
                </CardFooter>

                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

                <p className="text-[8px] font-sans text-gray-600 pt-5">
                    Ved at trykke videre accepterer jeg, at mine oplysninger deles med CarHype&apos;s betroede partnere, så jeg kan få et personligt tilbud. Oplysningerne behandles sikkert og bruges kun til dette formål. Samtykket kan trækkes tilbage når som helst ved at sende en mail til <b>info@carhype.dk</b>
                </p>
            </div>
        </div>
    );
}

