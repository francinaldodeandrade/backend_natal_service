import express from "express"
const router = express.Router()

import controllers from "../controllers/usersControllers.js"
import usersControllers from "../controllers/usersControllers.js"

router.get("/", controllers.getAll)
router.get("/readUsers", controllers.readGet)
router.post("/createUsers", controllers.createProd)
router.get("/search/:id", controllers.SearchById)
router.put("/update/:id", controllers.updateById)
router.delete("/remove/:id", controllers.removeById)



export default router
 