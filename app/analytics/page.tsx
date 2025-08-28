"use client";
import React, { useEffect, useState } from "react";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/analytics?password=${encodeURIComponent(password)}`);
            const json = await res.json();
            if (res.status !== 200) setError(json.error || "Unauthorized");
            else setData(json);
        } catch (err) {
            setError("Error fetching analytics");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics Viewer</h1>

            {!data ? (
                <>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={fetchData}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                    >
                        View Analytics
                    </button>
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </>
            ) : (
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}
