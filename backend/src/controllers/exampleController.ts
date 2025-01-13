import { Request, Response } from "express";

const getExample = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Hello from Express with TypeScript!" });
};

export default { getExample };
