import { Router } from "express";
import { getAllProperties, getPropertyDetails, searchPropertyByLocation,searchPropertyByprice } from "../controllers/property.controllers.js";
const router = Router()

router.route('/propertyList').get(getAllProperties)
router.route('/details').post(getPropertyDetails)
router.route('/search/location').post(searchPropertyByLocation)
router.route('/search/price').post(searchPropertyByprice)


export default router
