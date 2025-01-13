import express, { Application } from "express";
import routes from "./routes";
import cors from 'cors'
import { setupSwaggerDocs } from "./swagger";

const app: Application = express();
app.use(cors())
setupSwaggerDocs(app)

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/api/files", routes)

export default app;
