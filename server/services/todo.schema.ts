import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100),
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1).max(100).optional(),
  completed: z.boolean().optional(),
});

// Types
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;