import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.use(errorMiddleware);

export default app;
