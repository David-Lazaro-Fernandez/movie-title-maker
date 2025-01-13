import express, { Application } from "express";
import routes from "./routes";
import fileRoutes from './routes/fileRoutes'

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Rutas
app.use("/api", routes);
app.use("/api/files", fileRoutes)

export default app;
