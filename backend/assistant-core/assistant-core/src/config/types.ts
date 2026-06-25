import { z } from "zod";

export const LeadFieldSchema = z.object({
  key: z.string().trim().min(1),
  label: z.string().trim().min(1),
  required: z.boolean(),
}).strict();

export const AssistantConfigSchema = z.object({
  name: z.string().trim().min(1),
  brandTone: z.enum(["formal", "casual", "friendly"]),
  systemPrompt: z.string().trim().min(10),
  escalationPhrase: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .refine((value) => !/[\r\n]/.test(value), {
      message: "Escalation phrase must be a single line",
    }),
  fallbackMessage: z.string().trim().min(3),
  language: z.string().trim().min(2).default("en"),
  maxTurns: z.number().int().min(1).max(50).default(20),
  leadFields: z.array(LeadFieldSchema),
}).strict().superRefine((config, context) => {
  const seen = new Set<string>();

  for (const field of config.leadFields) {
    if (seen.has(field.key)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate lead field key: ${field.key}`,
        path: ["leadFields"],
      });
      return;
    }

    seen.add(field.key);
  }
});

export type AssistantConfig = z.infer<typeof AssistantConfigSchema>;
export type LeadField = z.infer<typeof LeadFieldSchema>;
