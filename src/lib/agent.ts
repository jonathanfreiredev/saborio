import { openai } from "@ai-sdk/openai";
import { stepCountIs, ToolLoopAgent, type InferAgentUIMessage } from "ai";
import { createRecipe } from "./agent-tools";

export const agent = new ToolLoopAgent({
  model: openai("gpt-4.1-mini"),
  tools: {
    createRecipe,
  },
  stopWhen: stepCountIs(10),
});

export type MyAgentUIMessage = InferAgentUIMessage<typeof agent>;
