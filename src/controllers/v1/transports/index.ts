import TransportBL from './BL';
import { createRouter } from '@/utils/createRouter';

const router = createRouter();

router.createCrud(TransportBL);

export default router;
