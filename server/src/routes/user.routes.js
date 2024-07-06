import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    addPropertylisting,
    removePropertyListing,
    getUserListings
} from '../controllers/user.controllers.js'
import { verifyJWT } from "../middlewars/auth.middlewares.js";
import {upload} from '../middlewars/multer.middlewares.js'


const router = Router()

router.route('/register').post(upload.none(),registerUser)
router.route('/login').post(upload.none(),loginUser)
router.route('/logout').get(verifyJWT,logoutUser)
router.route('/new-property').post(verifyJWT,upload.array("photos",12),addPropertylisting)
router.route('/delete-property').delete(verifyJWT,removePropertyListing)
router.route('/userListings').post(verifyJWT,getUserListings)


export default router