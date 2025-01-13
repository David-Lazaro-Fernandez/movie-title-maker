import { Router } from "express";
import exampleController from "../controllers/exampleController";
import FileProcessorController from "../controllers/FileProcessorController";

const router = Router();

router.get("/", exampleController.getExample);

router.post(
    "/upload",
    FileProcessorController.upload.array('files'),
    FileProcessorController.processFiles
)

export default router;
