import express, { Application, Request, Response } from "express";
const app: Application = express();

require("dotenv").config();

app.get("/", (req: Request, res: Response): void => {
  res.send("Home Route");
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server running on port ${process.env.PORT}`);
});
