import { Request, Response } from "express-serve-static-core";

export default function fromBody(_: Request, res: Response) {
    return res.locals.body;
}