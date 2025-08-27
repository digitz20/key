
"use server";

import { replayInput, ReplayInputInput } from "@/ai/flows/replay-input";

export async function handleReplay(
  keystrokes: string
): Promise<string> {
  if (!keystrokes) {
    return "Error: No keystrokes provided.";
  }

  const input: ReplayInputInput = { keystrokes };

  try {
    const result = await replayInput(input);
    return result;
  } catch (e) {
    console.error(e);
    return "An error occurred during replay.";
  }
}
