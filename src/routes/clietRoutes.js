import express from "express"
const router = express.Router()

import clietControllers from "../controllers/clietControllers.js"
import authControllers from "../controllers/auth.Controllers.js"
import authentication from "../auth/validateCliet.js"


//rota para entidade clientes

router.post("/createCliet", clietControllers.createCliet)
router.post("/login", authControllers.login)

//router.get("/", clietControllers.getAll)
router.get("/readClient", clietControllers.getCliet)
router.get("/searchCliet/:id", clietControllers.seaById)
router.put("/updateCliet/:id", authentication.validateToken, clietControllers.updById)
router.delete("/removeCliet/:id", clietControllers.delById)


export default router
 