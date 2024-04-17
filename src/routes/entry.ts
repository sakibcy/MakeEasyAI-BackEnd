import express, {Request, Response} from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Testing 8:10pm");
});

export default router;