'use client';

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UserFormDialog({
    open,
}: {
    open: boolean;
}) {
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
            console.log(err)
            setError("Der skete en fejl ved tilmelding.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => { /* disable manual close */ }}>
            <DialogContent className="p-2 max-w-sm sm:max-w-md border-none bg-transparent shadow-none [&>button]:hidden">
                <Card className="bg-orange-50 shadow-xl rounded-xl w-full border-none">
                    <DialogHeader className=" flex items-center text-center pt-6">
                        <DialogTitle className="text-2xl font-semibold font-serif">
                            {isSubmitted ? "Tak!" : "Få mere ud af din køretid"}
                        </DialogTitle>
                    </DialogHeader>
                    <CardContent className="p-6 pt-0">
                        {isSubmitted ? (
                            <div className="text-center space-y-4">
                                <p className="text-base font-medium">{message}</p>
                                <button
                                    onClick={() => router.push("/")}
                                    className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black transition"
                                >
                                    Til forsiden
                                </button>
                            </div>
                        ) : (
                            <>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <p className="text-base font-serif mb-8">
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
                                            className="w-full p-2 border rounded bg-white"
                                            disabled={isLoading}
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
                                            className="w-full p-2 border rounded bg-white"
                                            disabled={isLoading}
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

                                <div className="pt-2 text-center">
                                    <button
                                        onClick={() => router.push("/")}
                                        className="text-sm text-gray-600 underline hover:text-black"
                                        disabled={isLoading}
                                    >
                                        Eller gå til forsiden
                                    </button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
