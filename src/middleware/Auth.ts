import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface User {
  id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization as string;
    const token = header?.split(" ")[1];
    !token && res.status(403).json({ msg: "you are not authorized" });
    const deToken = jwt.verify(token, process.env.API_SECRET as string) as User;
    res.locals.user = deToken;
    next();
  } catch (err) {
    res.status(403).json({ msg: `you are not authorized: ${err}` });
  }
};

export default auth;
