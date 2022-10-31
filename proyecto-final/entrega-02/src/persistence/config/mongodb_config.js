import mongoose from 'mongoose';

const mongoDB_connect = () => {
  const options = {
    auth: {
      authSource: 'admin',
    },
    user: 'root',
    pass: 'root_password',
  };
  const connection_string = 'mongodb://localhost:27017/coderhouse';

  mongoose.connect(connection_string, options);
};

export default mongoDB_connect;
