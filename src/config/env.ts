import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

  DB_HOST: z.string().min(1).default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_USER: z.string().min(1).default("postgres"),
  DB_PASSWORD: z.string().min(1).default("postgres"),
  DB_NAME: z.string().min(1).default("sort_me"),
});

export const env = envSchema.parse(process.env);
