import { router } from "./auth";
import { drouter } from "./discord";
import express from "express";

export const routes = express.Router();

routes.use("/auth", router);
routes.use("/discord", drouter);
