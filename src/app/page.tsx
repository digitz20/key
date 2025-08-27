"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MalwareSimulator } from "@/components/malware-simulator";
import { EyeOff, ShieldAlert } from "lucide-react";

export default function Home() {
  const [stealthMode, setStealthMode] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary-foreground">
              Keystroke Sentinel
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="stealth-mode"
              checked={stealthMode}
              onCheckedChange={setStealthMode}
              aria-label="Stealth Mode"
            />
            <Label htmlFor="stealth-mode" className="text-muted-foreground">
              Stealth Mode
            </Label>
          </div>
        </header>

        {stealthMode ? (
          <Card className="flex flex-col items-center justify-center text-center py-20 bg-card/50 border-dashed">
            <EyeOff className="w-16 h-16 text-muted-foreground mb-4" />
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Stealth Mode Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitoring is running in the background.
              </p>
            </CardContent>
          </Card>
        ) : (
          <MalwareSimulator />
        )}
      </div>
    </main>
  );
}
