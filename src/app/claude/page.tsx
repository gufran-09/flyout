
"use client";

import React, { useState } from 'react';
import { callClaude, analyzeProject } from '@/lib/claude';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Shield, Zap, Search, Code, FileCode } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

const ClaudeDashboard = () => {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleChat = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        try {
            const response = await callClaude(prompt);
            setChatResponse(response);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to get response",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalysis = async (type: 'full-audit' | 'security' | 'performance' | 'refactor') => {
        setIsLoading(true);
        setAnalysisResult('');
        try {
            toast({
                title: "Analysis Started",
                description: `Running ${type} analysis. This may take a few minutes...`,
            });
            const result = await analyzeProject(type);
            setAnalysisResult(result);
        } catch (error: any) {
            toast({
                title: "Analysis Failed",
                description: error.message || "Analysis failed to complete",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Claude AI Integration
            </h1>
            <p className="text-muted-foreground mb-8">
                Interact with Claude 3.5 Sonnet for chat or full codebase analysis.
            </p>

            <Tabs defaultValue="chat" className="w-full space-y-4">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="analysis">Codebase Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="chat">
                    <Card>
                        <CardHeader>
                            <CardTitle>Chat with Claude</CardTitle>
                            <CardDescription>Ask questions or get help with specific snippets.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <Textarea
                                    placeholder="Ask Claude something..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="min-h-[100px]"
                                />
                                <Button
                                    onClick={handleChat}
                                    disabled={isLoading || !prompt.trim()}
                                    className="w-full lg:w-auto"
                                >
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                    Send Message
                                </Button>
                            </div>

                            {chatResponse && (
                                <Card className="mt-6 bg-slate-50 dark:bg-slate-900">
                                    <CardContent className="pt-6">
                                        <div className="prose dark:prose-invert max-w-none">
                                            <ReactMarkdown>{chatResponse}</ReactMarkdown>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analysis">
                    <Card>
                        <CardHeader>
                            <CardTitle>Codebase Analysis</CardTitle>
                            <CardDescription>
                                Trigger a deep scan of your project files. Note: This requires sufficient API credits.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200" onClick={() => handleAnalysis('full-audit')} disabled={isLoading}>
                                    <Search className="h-6 w-6" />
                                    Full Audit
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-red-50 hover:text-red-700 hover:border-red-200" onClick={() => handleAnalysis('security')} disabled={isLoading}>
                                    <Shield className="h-6 w-6" />
                                    Security Scan
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200" onClick={() => handleAnalysis('performance')} disabled={isLoading}>
                                    <Zap className="h-6 w-6" />
                                    Performance
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200" onClick={() => handleAnalysis('refactor')} disabled={isLoading}>
                                    <FileCode className="h-6 w-6" />
                                    Refactor Specs
                                </Button>
                            </div>

                            {isLoading && !analysisResult && (
                                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                                    <p>Analyzing codebase... This can take several minutes.</p>
                                </div>
                            )}

                            {analysisResult && (
                                <Card className="bg-slate-50 dark:bg-slate-900 border-2 border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Analysis Report</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-white dark:bg-slate-950">
                                            <div className="prose dark:prose-invert max-w-none">
                                                <ReactMarkdown>{analysisResult}</ReactMarkdown>
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ClaudeDashboard;
