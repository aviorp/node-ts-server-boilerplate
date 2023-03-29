import { createRouter } from '#utils/createRouter';
import VoteBL from './BL.js';
import VoteService from './service.js';

const router = createRouter();
// router.get('/:genre', async (req, res) => {
//   const { genre } = req.params;
//   const games = await GameService.getGamesByGenre(genre);
//   res.json({
//     state: 'success',
//     data: games,
//   });
// });
router.get('/votes', async (req, res) => {
  const user_id = req.app.get('user_id');
  const votes = await VoteService.getVotesByUserId(user_id as string);
  res.json({
    state: 'success',
    data: votes,
  });
});
router.createCrud(VoteBL, true);

export default router;
