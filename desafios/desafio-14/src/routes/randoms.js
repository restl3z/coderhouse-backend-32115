import { Router } from 'express';
import { fork } from 'child_process';

const router = Router();

router.get('/', (req, res) => {
  const quantity = req.query.quantity || 100000000;
  const child_process = fork('./src/utils/fork_randoms.js');
  child_process.send(quantity);
  child_process.on('message', (result) => {
    res.json({ result: result });
  });
});

export default router;
