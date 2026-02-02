"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    const [jsonContent, setJsonContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/portfolio');
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setJsonContent(JSON.stringify(data, null, 4));
            setMessage(null);
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to load data." });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            // Validate JSON first
            const parsed = JSON.parse(jsonContent);

            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsed),
            });

            if (!res.ok) throw new Error("Failed to save");

            setMessage({ type: 'success', text: "Portfolio updated successfully!" });
        } catch (error) {
            if (error instanceof SyntaxError) {
                setMessage({ type: 'error', text: "Invalid JSON format. Please check your syntax." });
            } else {
                setMessage({ type: 'error', text: "Failed to save changes." });
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-12 font-sans">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                            <p className="text-muted-foreground">Manage your portfolio data directly.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={fetchData} disabled={loading || saving} size="icon">
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button onClick={handleSave} disabled={loading || saving}>
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>

                {message && (
                    <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
                        {message.text}
                    </div>
                )}

                <Card className="border-border/50 shadow-xl">
                    <CardHeader>
                        <CardTitle>JSON Editor</CardTitle>
                        <CardDescription>
                            Edit the raw JSON below. Be careful with validation!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                                Loading...
                            </div>
                        ) : (
                            <textarea
                                value={jsonContent}
                                onChange={(e) => setJsonContent(e.target.value)}
                                className="w-full h-[600px] font-mono text-sm p-4 rounded-md border border-input bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring resize-y leading-relaxed"
                                spellCheck="false"
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
