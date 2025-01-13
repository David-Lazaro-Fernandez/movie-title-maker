// controllers/fileController.ts
import { Request, Response } from "express";
import multer from "multer";
import fsPromise from "fs/promises";
import path from "path";
import mammoth from "mammoth";
import pdf from 'pdf-parse';
import * as XLSX from 'xlsx'

// Types and Interfaces
interface MovieTeamMember {
    name: string;
    role: string;
}

// Multer configuration for handling uploaded files
const upload = multer({ dest: "uploads/" });

/**
 * Main controller for processing multiple files.
 * Processes uploaded files of different formats (.json, .csv, .md, .docx, .txt),
 * extracts relevant information, and returns an array of MovieTeamMember objects.
 * 
 * @param req - HTTP request object
 * @param res - HTTP response object
 */
const processFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ error: "No files were uploaded." });
            return;
        }

        const movieTeam: MovieTeamMember[] = [];

        for (const file of files) {
            const filePath = path.resolve(file.path);
            const extension = path.extname(file.originalname).toLowerCase();
            const extractedData = await parseFileByExtension(filePath, extension, res);

            movieTeam.push(...extractedData);
            await fsPromise.unlink(filePath); // Delete the file after processing
        }



        res.status(200).json({ success: true, data: verifyNoRepeatedMembers(movieTeam) });
    } catch (error) {
        console.error("Error processing files:", error);
        res
            .status(500)
            .json({ error: "Error processing files.", details: (error as Error).message });
    }
};

/**
 * Function that determines the appropriate method to process a file based on its extension.
 * 
 * @param filePath - Path of the file to process
 * @param extension - File extension (e.g., .json, .csv)
 * @param res - HTTP response object for handling errors
 * @returns An array of MovieTeamMember objects extracted from the file
 */
async function parseFileByExtension(
    filePath: string,
    extension: string,
    res: Response
): Promise<MovieTeamMember[]> {
    switch (extension) {
        case ".md":
        case ".txt":
        case ".csv":
            return parseTextFile(filePath, extension);
        case ".docx":
            return parseDocxFile(filePath);
        case ".json":
            return parseJsonFile(filePath, res);
        case ".pdf":
            return parsePdfFile(filePath);
        case ".xlsx":
            return parseExcelFile(filePath);
        default:
            console.warn(`Unsupported file type: ${extension}`);
            res.status(400).json({ error: `Unsupported file type: ${extension}` });
            return [];
    }
}

/**
 * Reads a text file (MD, TXT, CSV) and extracts the information as an array of MovieTeamMember.
 * For CSV files, the first line (headers) will be ignored.
 * 
 * @param filePath - Path of the text file
 * @param extension - File extension
 * @returns An array of MovieTeamMember objects extracted from the text
 */
async function parseTextFile(filePath: string, extension: string): Promise<MovieTeamMember[]> {
    const content = await fsPromise.readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const filteredLines = extension === ".csv" ? lines.slice(1) : lines;

    return filteredLines
        .map((line) => {
            const [role, name] = line.split(",");
            if (!role || !name) return null;
            return { role: role.trim(), name: name.trim() };
        })
        .filter((member): member is MovieTeamMember => member !== null);
}

/**
 * Reads a JSON file and extracts the information as an array of MovieTeamMember.
 * Sends a `res.status(400)` if the JSON has an invalid format.
 * 
 * @param filePath - Path of the JSON file
 * @param res - HTTP response object for handling errors
 * @returns An array of MovieTeamMember objects extracted from the JSON
 */
async function parseJsonFile(filePath: string, res: Response): Promise<MovieTeamMember[]> {
    try {
        const content = await fsPromise.readFile(filePath, "utf-8");
        const data = JSON.parse(content);

        if (!Array.isArray(data)) {
            res.status(400).json({ error: "Invalid JSON format: Expected an array." });
            throw new Error("Invalid JSON format: Expected an array.");
        }

        return data
            .map((item) => {
                const { role, name } = item;
                if (!role || !name) return null;
                return { role: role.trim(), name: name.trim() };
            })
            .filter((member): member is MovieTeamMember => member !== null);
    } catch (error) {
        console.error("Error parsing JSON file:", error);
        res.status(400).json({ error: "Error parsing JSON file.", details: (error as Error).message });
        throw error;
    }
}

/**
 * Processes a DOCX file and extracts the information as an array of MovieTeamMember.
 * 
 * @param filePath - Path of the DOCX file
 * @returns An array of MovieTeamMember objects extracted from the content
 */
async function parseDocxFile(filePath: string): Promise<MovieTeamMember[]> {
    const content = await extractDocxContent(filePath);
    return extractMovieTeamMembers(content);
}

/**
 * Parses a PDF file and extracts information as an array of MovieTeamMember.
 * Each line in the PDF is expected to follow the format: "role, name".
 * 
 * @param filePath - Path of the PDF file
 * @returns An array of MovieTeamMember objects extracted from the PDF
 */
async function parsePdfFile(filePath: string): Promise<MovieTeamMember[]> {
    try {
        const fileBuffer = await fsPromise.readFile(filePath);

        const pdfData = await pdf(fileBuffer);
        const lines = pdfData.text.split("\n"); // Split content by lines

        return lines
            .map((line) => {
                const [role, name] = line.split(",");
                if (!role || !name) return null; // Skip invalid lines
                return { role: role.trim(), name: name.trim() };
            })
            .filter((member): member is MovieTeamMember => member !== null); // Filter out null values
    } catch (error) {
        console.error("Error parsing PDF file:", error);
        throw error;
    }
}

/**
 * Parses an Excel file and extracts information as an array of MovieTeamMember.
 * Each row in the Excel file is expected to have two columns: "Role" and "Name".
 * 
 * @param filePath - Path of the Excel file
 * @returns An array of MovieTeamMember objects extracted from the Excel file
 */
async function parseExcelFile(filePath: string): Promise<MovieTeamMember[]> {
    try {
        // Read the Excel file
        const fileBuffer = await fsPromise.readFile(filePath);

        // Parse the workbook
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const rows = XLSX.utils.sheet_to_json<{ role: string; name: string }>(sheet);

        // Map rows to MovieTeamMember array
        return rows
            .map((row) => {
                const { role, name } = row;
                if (!role || !name) return null; // Skip invalid rows
                return { role: role.trim(), name: name.trim() };
            })
            .filter((member): member is MovieTeamMember => member !== null);
    } catch (error) {
        console.error("Error parsing Excel file:", error);
        throw error;
    }
}

/**
 * Extracts the raw content of a DOCX file as plain text.
 * 
 * @param filePath - Path of the DOCX file
 * @returns Extracted text from the DOCX file
 */
async function extractDocxContent(filePath: string): Promise<string> {
    try {
        const fileBuffer = await fsPromise.readFile(filePath);
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        return result.value;
    } catch (error) {
        console.error("Error extracting text from .docx file:", error);
        throw error;
    }
}

/**
 * Extracts information from a plain text string and converts it into an array of MovieTeamMember.
 * 
 * Each line of text is expected to follow the format "Role, Name".
 * 
 * @param content - Plain text content to process
 * @returns An array of MovieTeamMember objects extracted from the text
 */
function extractMovieTeamMembers(content: string): MovieTeamMember[] {
    const uniqueMembers = new Set<string>()

   return content
        .split("\n")
        .map((line) => {
            const [name, role] = line.split(",");
            if (!name || !role) return null;
            
            const trimmedName = name.trim();
            const trimmedRole = role.trim();
            const uniqueKey = `${trimmedRole}:${trimmedName}`; // Unique identifier
            
            if (uniqueMembers.has(uniqueKey)) {
                return null; // Skip duplicates
            }
            
            uniqueMembers.add(uniqueKey); // Add to the set
            return { name: trimmedName, role: trimmedRole };
        })
        .filter((member): member is MovieTeamMember => member !== null); // Filter out null values
}

/**
 * Verifies that the input array of MovieTeamMember objects has no repeated members.
 * Removes duplicates based on both "role" and "name".
 * 
 * @param movieTeam - An array of MovieTeamMember objects
 * @returns A new array of unique MovieTeamMember objects
 */
function verifyNoRepeatedMembers(movieTeam: MovieTeamMember[]): MovieTeamMember[] {
    const uniqueMembers = new Set<string>(); // Tracks unique members as "role:name"

    return movieTeam.filter((member) => {
        const uniqueKey = `${member.role.trim()}:${member.name.trim()}`; // Unique identifier

        if (uniqueMembers.has(uniqueKey)) {
            return false; // Skip duplicates
        }

        uniqueMembers.add(uniqueKey); // Add to the set
        return true; // Include unique member
    });
}


export default {
    processFiles,
    upload,
};