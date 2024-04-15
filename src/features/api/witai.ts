import * as z from "zod";
import { PUBLIC_WITAI_TOKEN, PUBLIC_WITAI_URL } from "../config";

export const IntentSchema = z.object({
  id: z.string(),
  name: z.string(),
  confidence: z.number(),
});

export type Intent = z.infer<typeof IntentSchema>;

export const BaseEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  start: z.number(),
  end: z.number(),
  body: z.string(),
  confidence: z.number(),
  value: z.union([z.number(), z.string()]),
  type: z.string(),
});

export type Entity = z.infer<typeof BaseEntitySchema> & {
  entities: Record<string, Entity[]>;
};

export const EntitySchema: z.ZodType<Entity> = BaseEntitySchema.extend({
  entities: z.record(z.string(), z.array(z.lazy(() => EntitySchema))),
});

export const TraitSchema = z.object({
  id: z.string(),
  value: z.union([z.number(), z.string()]),
  confidence: z.number(),
});

export type TraitSchema = z.infer<typeof TraitSchema>;

export const WitAIResponseSchema = z.object({
  text: z.string(),
  intents: z.array(IntentSchema),
  entities: z.record(z.string(), z.array(EntitySchema)),
  traits: z.record(z.string(), z.array(TraitSchema)),
});

export type WitAIResponse = z.infer<typeof WitAIResponseSchema>;

export async function getWitAiResponse(query: string) {
  const response = await fetch(`${PUBLIC_WITAI_URL}?q=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PUBLIC_WITAI_TOKEN}`,
    },
  });

  const data = await response.json();
  console.log("response", data);
  return WitAIResponseSchema.parse(data);
}
