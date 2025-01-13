import { CreditsI } from "../../services/credits/credits.interface";

export interface FileUploaderI {
    file: File | null;
    status: "initial" | "uploading" | "success" | "fail";
}

export interface UploadResponseI{
    data: CreditsI[]
}
