import { createRouter } from '@/utils/createRouter';
import DriverBL from './BL';

const router = createRouter();

router.createCrud(DriverBL);

export default router;
