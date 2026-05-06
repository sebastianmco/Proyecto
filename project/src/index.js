import express from "express";
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
import { initDb } from "./initDb.js";

const app = express();

// CORS abierto para Vercel u otros orígenes
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usersRoutes);

// Health check para Render
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Iniciar servidor
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await initDb(); // crea la tabla si no existe
});
