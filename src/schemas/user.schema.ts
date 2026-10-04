import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1).max(100),
  age: z.number().int().min(0).max(150),
});
