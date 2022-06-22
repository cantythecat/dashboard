import { Router } from "express";

export const drouter: Router = Router();

drouter.get("/", (req, res) => {
  res.sendStatus(200);
});
