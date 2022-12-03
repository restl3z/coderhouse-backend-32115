const random_number_generator = (quantity) => {
  const response = {};
  for (let index = 0; index < quantity; index++) {
    const number = Math.floor(Math.random() * (1000 - 1) + 1);
    response[number] ? (response[number] += 1) : (response[number] = 1);
  }
  return response;
};

process.on('message', (quantity) => {
  console.log('Subprocess started: Generating random numbers...');
  const result = random_number_generator(quantity);
  process.send(result);
  console.log('Subprocess finished.');
  process.exit();
});
