export interface FileUploaderI {
    file: File | null;
    status: "initial" | "uploading" | "success" | "fail";
}