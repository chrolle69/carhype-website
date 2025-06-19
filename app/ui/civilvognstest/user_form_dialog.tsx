'use client'

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
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            setIsSubmitted(true);
        }
    };

    return (
        <Dialog open={open} /* prevents manual close */>
            <DialogContent className="p-2 max-w-sm sm:max-w-md border-none bg-transparent shadow-none [&>button]:hidden">
                <Card className="bg-red-100 shadow-xl rounded-xl w-full border-none">
                    <DialogHeader className=" flex items-center text-center pt-6">
                        <DialogTitle className="text-2xl font-semibold font-serif">
                            {isSubmitted ? "Tak!" : "Få mere ud af din køretid"}
                        </DialogTitle>
                    </DialogHeader>
                    <CardContent className="p-6 pt-0 space-y-">
                        {isSubmitted ? (
                            <div className="text-center space-y-4">
                                <p className="text-base font-medium ">
                                    Vi har modtaget dine oplysninger.
                                </p>
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
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full p-2 border rounded bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full p-2 border rounded bg-white"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                                    >
                                        Tilmeld
                                    </button>
                                </form>
                                <div className="pt-2 text-center">
                                    <button
                                        onClick={() => router.push("/")}
                                        className="text-sm text-gray-600 underline hover:text-black"
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
