import vehicleBL from './BL';
import { createRouter } from '@/utils/createRouter';

const router = createRouter();

router.createCrud(vehicleBL);

export default router;
