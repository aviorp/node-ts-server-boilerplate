import { createRouter } from '#utils/createRouter';
import PaypalService from './service.js';
const router = createRouter();

router.post('/', async (req, res) => {
  PaypalService.handleWebhook(req.body);
  return res.json({ message: 'PayPal ' });
});

export default router;
