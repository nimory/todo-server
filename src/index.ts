import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.post("/createTodos", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodos = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(createTodos);
  } catch (err) {
    return res.status(400).json(err);
  }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (err) {
    return res.status(400).json(err);
  }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  } catch (err) {
    return res.status(400).json(err);
  }
});

app.listen(PORT, () => console.log("server is running🚀"));
