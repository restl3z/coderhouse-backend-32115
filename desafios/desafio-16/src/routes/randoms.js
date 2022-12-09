import { Router } from 'express';
// import { fork } from 'child_process';
import { logger_console } from '../logger.js';

const router = Router();

router.get('/', (req, res) => {
  logger_console.info('GET /api/randoms');
  const quantity = parseInt(req.query.quantity) || 100000000;
  // const child_process = fork('./src/utils/fork_randoms.js');
  // child_process.send(quantity);
  // child_process.on('message', (result) => {
  //   res.json({ result: result });
  // });
  const response = {};
  for (let index = 0; index < quantity; index++) {
    const number = Math.floor(Math.random() * (1000 - 1) + 1);
    response[number] ? (response[number] += 1) : (response[number] = 1);
  }
  res.json({ result: response });
});

export default router;
