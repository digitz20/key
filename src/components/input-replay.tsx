
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { handleReplay } from "@/app/actions";
import { Bot, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InputReplayProps {
  capturedKeystrokes: string;
}

export function InputReplay({ capturedKeystrokes }: InputReplayProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const onReplay = async () => {
    if (!capturedKeystrokes) {
      toast({
        title: "No Keystrokes Captured",
        description: "Please type something first to capture keystrokes for replay.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const replayResult = await handleReplay(capturedKeystrokes);
      setResult(replayResult);
    } catch (error) {
      console.error("Replay error:", error);
      toast({
        title: "Replay Failed",
        description: "Could not connect to the AI replay service.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-accent" />
          <CardTitle>Input Replay Simulation</CardTitle>
        </div>
        <CardDescription>
          Use GenAI to simulate user input from captured keystrokes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Captured keystrokes will appear here..."
          value={capturedKeystrokes}
          readOnly
          className="h-24 font-mono text-sm bg-background/50"
        />
        {result && (
            <div className="p-3 rounded-md bg-muted text-sm text-muted-foreground">
                <p><strong>AI Response:</strong> {result}</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onReplay} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {loading ? "Simulating..." : "Run Replay Simulation"}
        </Button>
      </CardFooter>
    </Card>
  );
}
