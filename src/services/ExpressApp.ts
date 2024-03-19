import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { RydeuRouter } from "../routes";

export default async (app: Application) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api/v1/rydeu", RydeuRouter);

  return app;
};
