import express from "express";
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

app.use(morgan("dev"));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usersRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT);
// eslint-disable-next-line no-console
console.log("Server on port", PORT);
