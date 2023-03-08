import express from "express";
import {
  findUsers,
  Register,
  updateUser,
  deleteUser,
  Login,
  removeUser,
  updateUser2,
} from "../controller/user.controller";
import validate from "../middleware/validate";
import { Registertype } from "../zod.schema/zod.user";
import auth from "../middleware/Auth";

let route = express.Router();

route.get("/", findUsers);

route.post("/", validate(Registertype), Register);
route.post("/login", Login);
route.put("/", auth, updateUser2);

route.delete("/", auth, removeUser);

// route.post("/endpointID", endpointWithID);
// route.post("/endpointEmail", endpointWithEmail);
// route.post("/endpointEmail", endpointWithAge);

// route.put("/updatePassword", newPassword);

export default route;
