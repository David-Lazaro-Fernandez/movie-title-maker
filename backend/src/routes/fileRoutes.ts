import { Router } from "express";
import fileProcessorController from "../controllers/FileProcessorController";

const router = Router();

router.post(
  "/upload",
  fileProcessorController.upload.array("files"), // Para recibir múltiples archivos
  fileProcessorController.processFiles
);

export default router;