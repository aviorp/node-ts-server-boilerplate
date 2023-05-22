import { createRouter } from '@/utils/createRouter';
import UserBL from './BL';

const router = createRouter();

router.createCrud(UserBL);

export default router;
