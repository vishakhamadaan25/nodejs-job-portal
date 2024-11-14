import express from 'express';
import {loginController, registerController} from "../controllers/authContoller.js";
import rateLimit from 'express-rate-limit';

//ip limiter
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
});


//router object
const router=express.Router();

//routes

/**
 *@swagger
 * components:
 * schemas:
 *      User:
 *          type:Object
 *          required:
 *              - name
 *              - lastName
 *              - email
 *              - password
 *              - location
 *             properties:
 *                  id:
 *                    type:string
 *                    description: The Auto-generated id of user collection
 *                  name:
 *                    type:string
 *                    description: user name
 *                  email:
 *                    type:string
 *                    description: user email adress
 * password:
 *                    type:string
 *                    description: user password
 * location:
 *                    type:string
 *                    description: user location city or country
 * example:
 *                    id:hfbeiygr
 *                    name:john
 *                    last name:john doe
 *                    email:johndoe@gmail.com
 *                    name:test
 */
// REGISTER || POST
router.post('/register',limiter,registerController);

// LOGIN || POST
router.post('/login',limiter,loginController)

//export
export default router;