const socketClient = io();

const product_form = document.getElementById('product-form');
const user_chat_form = document.getElementById('user-chat-form');

const entity_author = new normalizr.schema.Entity(
  'author',
  {},
  { idAttribute: 'email' }
);
const entity_message = new normalizr.schema.Entity('message', {
  author: entity_author,
});
const entity_message_collection = new normalizr.schema.Entity('collection', {
  collection: [entity_message],
});

product_form.onsubmit = (e) => {
  e.preventDefault();
  const new_product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };

  socketClient.emit('product_added', new_product);

  product_form.reset();
};

socketClient.on('update_products', async (products) => {
  let view = await fetch('../views/product-list.hbs');
  let view_text = await view.text();
  let view_text_compile = Handlebars.compile(view_text);

  let html_content = view_text_compile({ products });

  document.getElementById('product-list').innerHTML = html_content;
});

user_chat_form.onsubmit = (e) => {
  e.preventDefault();

  const new_message = {
    author: {
      email: document.getElementById('user-chat-form-email').value,
      first_name: document.getElementById('user-chat-form-first-name').value,
      last_name: document.getElementById('user-chat-form-last-name').value,
      age: document.getElementById('user-chat-form-age').value,
      alias: document.getElementById('user-chat-form-alias').value,
      avatar: document.getElementById('user-chat-form-avatar').value,
    },
    message: document.getElementById('user-chat-form-message').value,
    date: new Date().toLocaleString(),
  };

  socketClient.emit('message_added', new_message);

  user_chat_form.reset();
};

socketClient.on('update_messages', async (normalized_messages) => {
  const denormalized_messages = normalizr.denormalize(
    normalized_messages.result,
    entity_message_collection,
    normalized_messages.entities
  );
  const messages = denormalized_messages.collection;

  let view = await fetch('../views/message-list.hbs');
  let view_text = await view.text();
  let view_text_compile = Handlebars.compile(view_text);

  let html_content_messages = view_text_compile({ messages });
  document.getElementById('user-chat-history').innerHTML =
    html_content_messages;

  let compression_ratio = parseInt(
    (JSON.stringify(normalized_messages).length /
      JSON.stringify(denormalized_messages).length) *
      100
  );
  let html_content_compression = `<h4><i>Messages compression ratio: ${compression_ratio}%</i></h4>`;
  document.getElementById('compression-ratio').innerHTML =
    html_content_compression;
});

socketClient.on('products_test', async (products_test) => {
  let view = await fetch('../views/product-test-list.hbs');
  let viewText = await view.text();
  let viewTextCompile = Handlebars.compile(viewText);

  let html_content = viewTextCompile({ products_test });

  document.getElementById('product-test-list').innerHTML = html_content;
});
