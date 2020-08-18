import { UserLoginCredetials , User } from './../interfaces/user.interface';
import { register } from './../core/authHandlers';
import { checkIfUserExist, getUserByEmail } from './../core/userHandlers';
import express ,{ Router, Request, Response, NextFunction } from 'express';
import { compareSync } from 'bcrypt';

const router :Router = express.Router();

router.post('/register' , async (req:Request , res:Response , next:NextFunction) => {
    try {
        let isAlreadyRegistered :boolean = await checkIfUserExist(req.body.email);
        if(isAlreadyRegistered) {
            return await res.status(409).send('User Already Exist.')
        }
        let response = await register(req.body);
        await res.status(201).send(response);

    } catch (error) {
     next(error)    
    }
});

router.post('/login', async (req:Request , res:Response , next:NextFunction)=> {
    let {email , password}:UserLoginCredetials = req.body;

    try {
        let isExist :boolean = await checkIfUserExist(email);
        let user:User = await getUserByEmail(email);
        let validPassword = compareSync(password , user.password);
        if (isExist) {

            // TODO : COMPARE DIDNT WORK WELL.
          
        } else  {
            return res.status(401).send('User not exist.')
        }
    } catch (error) {
        next(error)
    }
})



export default router;