import { Task } from "@prisma/client";
import prisma from "../config/db";
import { Request, Response } from "express";

const findTasks = async (req: Request, res: Response) => {
  let task = await prisma.task.findMany();
  res.sendStatus(200).json(task);
};

const addTask = async (req: Request, res: Response) => {
  let tasks = req.body;
  let task = await prisma.task.create({
    data: tasks
  });

  res.json({ msg: "Task has been added successfully", task });
};

const updateTask = async (req: Request, res: Response) => {
  let task = await prisma.task.update({
    where:{
        id: req.params.id
    },
    data: {
        title: req.body.title
    },
  });

  res.json({ msg: "Task has been updated successfully", task });
};

const deleteTask = async (req: Request, res: Response) => {
  await prisma.task.delete({
    where: {
      id: req.params.id,
    },
  });
    res.json({ msg: "Task has been deleted successfully" });

};

export { addTask, findTasks, updateTask, deleteTask };
