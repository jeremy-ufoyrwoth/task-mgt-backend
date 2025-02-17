import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
//@ts-ignore
import apiRouter from "./router/Router";
import { useError } from "./middleware/error";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000", "localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello - Mars!");
});

app.use(useError);

app.listen(port, () => {
  return console.log(`Server running on port:${port}`);
});
