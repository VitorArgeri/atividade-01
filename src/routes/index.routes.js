import { Router } from "express";
import emocoesRoutes from "./candidatos.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
    return res.status(200).send({
        message: "Vamo São paulo!!!"
    })
})

export default routes