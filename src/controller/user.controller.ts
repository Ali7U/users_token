import prisma from "../config/db";
import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export const findUsers = async (req: Request, res: Response) => {
  let users = await prisma.user.findMany();
  res.json(users);
};

export const Register = async (req: Request, res: Response) => {
  let password = req.body.password;
  const hash = await argon2.hash(password);
  let user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
      email: req.body.email,
    },
  });
  res.json({ msg: "user created", user: user });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      },
    });
    res.json({ msg: "Update seccesfully" });
  } catch (error) {
    console.log("err");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "Deleted user has been succesful" });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ Error: " Wrong email address" });
    } else if (!(await argon2.verify(user.password, req.body.password))) {
      return res.sendStatus(400).json({ Error: "Wrong password" });
    }
    const enToken = jwt.sign(
      { id: user.id },
      process.env.API_SECRET as string,
      { expiresIn: "3h" }
    );
    return res
      .status(200)
      .json({ msg: `welcome ${user.username}`, token: enToken });
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    let { id } = res.locals.user;
    const del = await prisma.user.delete({
      where: { id: id },
    });
    !del
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "Deleted user has been succesful", delete: del });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const updateUser2 = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    let { id } = res.locals.user;
    const hash = await argon2.hash(password);
    const upd = await prisma.user.update({
        where: { id: id },
        data: {
            username: req.body.username,
            password: hash,
        },
    });
    !upd
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "update user has been succesful", upd: upd });
  } catch (err) {
    res.json({ msg: err });
  }
};
