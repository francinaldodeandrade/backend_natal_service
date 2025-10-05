import express from "express"
const router = express.Router()

import controllers from "../controllers/serviceControllers.js"


router.get("/readService", controllers.readService)
router.post("/createService", controllers.createService)
router.get("/search/:id", controllers.seaById)
router.put("/update/:id", controllers.updById)
router.delete("/remove/:id", controllers.delById)

export default router
 