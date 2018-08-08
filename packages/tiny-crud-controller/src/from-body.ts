import { Request, Response } from "express-serve-static-core";

export default function fromBody(req: Request, _: Response) {
    return req.body;
}