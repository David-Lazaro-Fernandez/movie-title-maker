import express, { Application } from "express";
import routes from "./routes";
import fileRoutes from './routes/fileRoutes'
import cors from 'cors'

const app: Application = express();
app.use(cors())


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/api", routes);
app.use("/api/files", fileRoutes)

export default app;
