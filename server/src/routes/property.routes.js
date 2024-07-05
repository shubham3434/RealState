import { Router } from "express";
import { getAllProperties } from "../controllers/property.controllers.js";
const router = Router()

router.route('/propertyList').get(getAllProperties)

export default router
