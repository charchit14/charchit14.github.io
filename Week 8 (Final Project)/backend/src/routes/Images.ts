import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
import NotFoundError from "../errors/NotFound";
const router = Router();

router.get(
  "/:user/:image",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.params.image;
      const user = req.params.user;
      const fileExists = fs.existsSync(`./uploads/${user}/${image}`);
      if (!fileExists) throw new NotFoundError("Requested file does not exist");
      res.sendFile(image, { root: `./uploads/${user}/` });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
