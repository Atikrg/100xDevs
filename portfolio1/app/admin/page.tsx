"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    const [jsonContent, setJsonContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("admin_password");
        if (saved) {
            setPassword(saved);
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("admin_password", inputPassword);
        setPassword(inputPassword);
        setIsAuthenticated(true);
        fetchData();
    };

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
                    'x-admin-password': password
                },
                body: JSON.stringify(parsed),
            });

            if (res.status === 401) {
                setIsAuthenticated(false);
                localStorage.removeItem("admin_password");
                throw new Error("Unauthorized: Invalid Password");
            }

            if (!res.ok) throw new Error("Failed to save");

            setMessage({ type: 'success', text: "Portfolio updated successfully!" });
        } catch (error: any) {
            if (error instanceof SyntaxError) {
                setMessage({ type: 'error', text: "Invalid JSON format. Please check your syntax." });
            } else {
                setMessage({ type: 'error', text: error.message || "Failed to save changes." });
            }
        } finally {
            setSaving(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <Card className="w-full max-w-md border-border/50 shadow-xl">
                    <CardHeader>
                        <CardTitle>Admin Access</CardTitle>
                        <CardDescription>Enter the admin password to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
                        <Button variant="outline" onClick={() => {
                            localStorage.removeItem("admin_password");
                            setIsAuthenticated(false);
                        }} size="sm">
                            Logout
                        </Button>
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
