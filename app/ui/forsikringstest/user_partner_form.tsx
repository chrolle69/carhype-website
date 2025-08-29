'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { QuestionId } from "@/app/lib/forsikringstest_questions";
import { trackPlausible } from "@/app/lib/plausible";

export default function UserPartnerForm(props: {
    partner: QuestionId
    answers: { [question: string]: string }
}) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNo, setPhoneNo] = React.useState("");
    const [zipcode, setZipcode] = React.useState("");
    const [plateNo, setPlateNo] = React.useState("");
    const [additional, setAdditional] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);
    const checkHandler = () => {
        setIsChecked(!isChecked);
    }

    trackPlausible("Formular opened");


    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);
        if (!isChecked) {
            setError("mangler at accepter betingelserne")
            setIsLoading(false);
            return
        }

        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
            phoneNo: formData.get("phoneNo"),
            zipcode: formData.get("zipcode"),
            plateNo: formData.get("plateNo"),
            additional: formData.get("additional"),
            partner: props.partner, // Include the partner information
            answers: props.answers
        };

        try {
            const res = await fetch("/api/createLead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsSubmitted(true);
                setMessage(data.message || "du er nu oprettet og vil blive kontaktet snarest!");
            } else {
                setError(data.message || "Noget gik galt prøv igen senere.");
            }
        } catch (err) {
            console.log(err);
            setError("Der skete en fejl ved tilmelding.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center pt-2 pb-4">
                <h2 className="text-2xl font-semibold font-serif">
                    {isSubmitted ? "Tak!" : "Få dit tilbud nu!"}
                </h2>
            </div>

            {isSubmitted ? (
                <div className="text-center space-y-4 mt-6">
                    <p className="text-base font-medium">{message}</p>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => router.push("/")}
                            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black transition"
                        >
                            Til forsiden
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-4 h-full">
                        {/* name field */}
                        <div>
                            <label className="block text-sm font-medium">Navn*</label>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        {/* email field */}
                        <div>
                            <label className="block text-sm font-medium">Email*</label>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+\-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$"
                                title="Indtast en gyldig Email (example@mail.com)"

                                required
                                disabled={isLoading}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        {/* phoneNo field */}
                        <div>
                            <label className="block text-sm font-medium">Telefonnummer*</label>
                            <input
                                name="phoneNo"
                                type="tel"
                                value={phoneNo}
                                pattern="\d{8,14}"
                                title="Indtast et gyldigt telefonnummer (8-14 cifre)"
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        {/* zipcode field */}
                        <div>
                            <label className="block text-sm font-medium">Postnummer</label>
                            <input
                                type="text"
                                name="zipcode"
                                autoComplete="zipcode"
                                onChange={(e) => setZipcode(e.target.value)}
                                value={zipcode}
                                pattern="^$|^\d{4}$"
                                title="Indtast et gyldigt 4-cifret dansk postnummer"
                                disabled={isLoading}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        {/* plateNo field */}
                        <div>
                            <label className="block text-sm font-medium">Nummerplade</label>
                            <input
                                name="plateNo"
                                type="text"
                                title="Indtast gyldig nummerplade på maks 10 tegn"
                                onChange={(e) => setPlateNo(e.target.value)}
                                value={plateNo}
                                disabled={isLoading}
                                pattern="[A-Za-z0-9\- ]{1,10}"
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>
                        {/* Additional field */}
                        <div>
                            <label className="block text-sm font-medium">Øvrig info (f.eks. har du erhvervsforsikring)</label>
                            <input
                                name="additional"
                                type="text"
                                title="F.eks. AB12345"
                                onChange={(e) => setAdditional(e.target.value)}
                                value={additional}
                                disabled={isLoading}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>

                        {error && (
                            <p className="text-red-600 font-semibold">{error}</p>
                        )}


                        <input className="w-4 h-4 mb-0" type="checkbox" name="checkbox-user-consent" checked={isChecked} onChange={checkHandler} />
                        <p className="text-xs font-sans">
                            Jeg giver samtykke til, at mine oplysninger må behandles og videregives i forbindelse med sagsbehandling. Jeg er informeret om, at samtykket kan trækkes tilbage når som helst ved at sende en mail til <b>info@carhype.dk</b>
                        </p>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 rounded text-white transition ${isLoading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                                }`}
                        >
                            {isLoading ? "Sender..." : "Bekræft og send"}
                        </button>
                    </form>

                    <div className="flex justify-center gap-5 pt-2 text-center">
                        <button
                            onClick={() => router.push("/")}
                            className="text-sm text-gray-600 underline hover:text-black"
                            disabled={isLoading}
                        >
                            Gå til forsiden
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
