import { createRouter } from '#utils/createRouter';
import GameBL from './BL.js';

const router = createRouter();

router.createCrud(GameBL, true);

export default router;
