import { z } from "zod";
import OpenAI from "openai";
import { env } from "../../../env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

console.log(env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const titleRouter = createTRPCRouter({
  getAiTitle: publicProcedure.query(async () => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
      //console.log("completion.choices:", completion.choices[0]);
      return completion.choices[0];
    } catch (error) {
      console.error("error:", error);
    }
  }),
});
