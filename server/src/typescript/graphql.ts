import { UserDocument } from "@models";
import { Request, Response } from "express";

export interface IContext {
  user?: UserDocument;
  req: Request;
  res: Response;
}
