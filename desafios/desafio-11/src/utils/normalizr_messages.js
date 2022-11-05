import { normalize, schema } from 'normalizr';

const collection = {
  id: 'messages',
  collection: [
    {
      author: {
        email: 'maxpower@example.com',
        first_name: 'Max',
        last_name: 'Power',
        age: '30',
        alias: 'maxpowr',
        avatar:
          'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
      },
      message: 'Hello there...',
      date: '10/30/2022, 10:09:59 PM',
      id: 1,
    },
    {
      author: {
        email: 'frankgrimes@example.com',
        first_name: 'Frank',
        last_name: 'Grimes',
        age: '35',
        alias: 'fgrimes',
        avatar:
          'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
      },
      message: 'General Kenobi',
      date: '10/30/2022, 10:10:10 PM',
      id: 2,
    },
    {
      author: {
        email: 'frankgrimes@example.com',
        first_name: 'Frank',
        last_name: 'Grimes',
        age: '35',
        alias: 'fgrimes',
        avatar:
          'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
      },
      message: 'All good?',
      date: '10/30/2022, 10:12:10 PM',
      id: 3,
    },
    {
      author: {
        email: 'maxpower@example.com',
        first_name: 'Max',
        last_name: 'Power',
        age: '30',
        alias: 'maxpowr',
        avatar:
          'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
      },
      message: 'Yeah...',
      date: '10/30/2022, 10:15:30 PM',
      id: 4,
    },
    {
      author: {
        email: 'maxpower@example.com',
        first_name: 'Max',
        last_name: 'Power',
        age: '30',
        alias: 'maxpowr',
        avatar:
          'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
      },
      message: 'Yeah...',
      date: '10/30/2022, 10:15:31 PM',
      id: 5,
    },
  ],
};

const entity_author = new schema.Entity('author', {}, { idAttribute: 'email' });
const entity_message = new schema.Entity('message', {
  author: entity_author,
});
const entity_message_collection = new schema.Entity('collection', {
  collection: [entity_message],
});

export { entity_message_collection, normalize };
