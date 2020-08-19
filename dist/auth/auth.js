"use strict";
// import jwt from 'jsonwebtoken';
// import { Request, Response ,NextFunction} from 'express';
// //VERIFY TOKEN ALL
// const verifyAll = (req:Request, res:Response, next:NextFunction) => {
//     const token = req.header('authorization');
//     if (!token) {
//         res.status(401).json({ status: 'failed', message: 'token not found' })
//     }
//     else {
//         jwt.verify(token, 'secretkey', (err, auth) => {
//             if (err) { next(err) }
//             else {
//                 console.log(auth);
//                 req.auth = auth;
//                 next()
//             }
//         });
//     }
// }
// //VERIFY TOKEN USER
// const user = (req:Request, res:Response, next:NextFunction)  => {
//     const token = req.header('authorization');
//     if (!token) {
//         res.status(401).json({ status: 'failed', message: 'token not found' })
//     }
//     else {
//         jwt.verify(token, 'secretkey', (err, auth) => {
//             if (err) { next(err) }
//             if (!auth) {
//                 res.status(401).json({ status: 'failed', message: 'user not authorized' })
//             }
//             else {
//                 console.log(auth);
//                 req.auth = auth;
//                 next()
//             }
//         });
//     }
// }
// //VERIFY TOKEN ADMIN
// const admin = (req:Request, res:Response, next:NextFunction)  => {
//     const token = req.header('authorization');
//     if (!token) {
//         res.status(401).json({ status: 'failed', message: 'token not found' })
//     }
//     else {
//         jwt.verify(token, 'secretkey', (err, auth) => {
//             if (err) {
//                 next(err)
//             }
//             else {
//                 if (!auth.isAdmin) {
//                     res.status(400).json({ status: 'failed', message: 'user not authorized' })
//                 }
//                 else {
//                     console.log(auth);
//                     req.auth = auth;
//                     next()
//                 }
//             }
//         });
//     }
// }
// module.exports = { verifyAll, user, admin };
//# sourceMappingURL=auth.js.map