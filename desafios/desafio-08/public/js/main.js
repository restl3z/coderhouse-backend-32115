const socketClient = io();

const product_form = document.getElementById('product-form');
const user_chat_form = document.getElementById('user-chat-form');

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
    date: new Date().toLocaleString(),
    email: document.getElementById('user-chat-form-email').value,
    message: document.getElementById('user-chat-form-message').value,
  };

  socketClient.emit('message_added', new_message);

  user_chat_form.reset();
};

socketClient.on('update_messages', async (messages) => {
  let view = await fetch('../views/message-list.hbs');
  let view_text = await view.text();
  let view_text_compile = Handlebars.compile(view_text);

  let html_content = view_text_compile({ messages });

  document.getElementById('user-chat-history').innerHTML = html_content;
});
