import express from "express";
import { AppDataSource } from "./database/data-source.js";
import { User } from "./entities/user.entity.js";
import { createUserSchema } from "./schemas/user.schema.js";

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Hello from Express!",
  });
});
app.post("/users", async (req, res) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: result.error,
    });
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create(result.data);

  const savedUser = await userRepository.save(user);

  return res.status(201).json(savedUser);
});
