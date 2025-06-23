'use client';

import React from "react";
import { useRouter } from "next/navigation";
import test from "node:test";

export default function UserForm() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
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
                setMessage(data.message || "Tak for din tilmelding!");
            } else {
                setError(data.message || "Noget gik galt.");
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
            <div className="text-center pt-2">
                <h2 className="text-2xl font-semibold font-serif">
                    {isSubmitted ? "Tak!" : "Få mere ud af din køretid"}
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
                        <button
                            onClick={() => router.push("/forsikringstest")}
                            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black transition"
                        >
                            Til forsikringstest
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <p className="text-base font-serif mb-4">
                            Tilmeld dig og få smarte bil-nyheder, eksklusive tilbud og værktøjer direkte i indbakken
                        </p>

                        <div>
                            <label className="block text-sm font-medium">Navn</label>
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

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full p-2 border rounded bg-white"
                            />
                        </div>

                        {error && (
                            <p className="text-red-600 font-semibold">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 rounded text-white transition ${isLoading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                                }`}
                        >
                            {isLoading ? "Sender..." : "Tilmeld"}
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
                        <button
                            onClick={() => router.push("/forsikringstest")}
                            className="text-sm text-gray-600 underline hover:text-black"
                            disabled={isLoading}
                        >
                            Gå til forsikringstest
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
