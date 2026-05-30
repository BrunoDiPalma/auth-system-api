import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import todoRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", todoRoutes);

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.use(errorMiddleware);

export default app;
