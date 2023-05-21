
import { createRouter } from '@/utils/createRouter';
import { UserBL } from '@/BL';

const router = createRouter();

router.createCrud(UserBL, ['first_name', 'last_name', 'username']);

export default router;
