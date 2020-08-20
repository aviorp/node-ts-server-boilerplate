import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';


/**
 * This function check if user can continue to protected routes.
 */
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if (!token) {
        res.status(401).send('token not found');
    } else {
        jwt.verify(token, 'secretkey', (err, auth) => {
            if (err) {
                return  res.status(401).send('invalid token');
            }
            if (!auth) {
               return  res.status(401).send('user not authorized');
            } 
             next()
        });
    }
}

/**
 * This function check if user can continue to protected routes as an admin.
 */
export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if (!token) {
        res.status(401).send('token not found');
    } else {
        jwt.verify(token, 'secretkey', (err, auth:any) => {
            if (err) {
                return  res.status(401).send('invalid token');
            } else {
                if (auth && !auth.isAdmin) {
                  return  res.status(403).send('this user is not an admin')
                }
                    console.log(auth);
                    next()
                
            }
        });
    }
}