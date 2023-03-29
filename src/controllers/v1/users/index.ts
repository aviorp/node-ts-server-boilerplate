import { createRouter } from '#utils/createRouter';
import UserBL from './BL.js';

const router = createRouter();

router.createCrud(UserBL, true);

export default router;
