import { sayHello } from './../core/index';
import express from 'express';

const router= express.Router();

router.get('/' , async (req ,res , next) => {
  try  {
      let message = await sayHello();
      res.send(message)
  }
  catch(err) {
    next(err)
  }
});


export default router;