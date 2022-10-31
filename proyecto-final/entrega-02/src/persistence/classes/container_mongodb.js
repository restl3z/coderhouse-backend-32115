import mongoDB_connect from '../config/mongodb_config.js';

mongoDB_connect();

export default class Container_MongoDB {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      return await this.model.find({});
    } catch (error) {
      throw new Error(`Could not read DB: ${error}`);
    }
  };

  save = async (new_object) => {
    try {
      const file_content = await this.getAll();
      file_content.length > 0
        ? (new_object._id = file_content[file_content.length - 1]._id + 1)
        : (new_object._id = 1);
      new_object.timestamp = new Date().toLocaleString();
      await new this.model(new_object).save();
      return new_object._id;
    } catch (error) {
      throw new Error(`Could not write to DB: ${error}`);
    }
  };

  getByID = async (lookupID) => {
    try {
      return await this.model.findById(lookupID);
    } catch (error) {
      throw new Error(`Could not find object in DB: ${error}`);
    }
  };

  deleteByID = async (lookupID) => {
    try {
      await this.model.deleteOne({ _id: lookupID });
    } catch (error) {
      throw new Error(`Could not delete object in DB: ${error}`);
    }
  };

  deleteAll = async () => {
    try {
      await this.model.deleteMany({});
    } catch (error) {
      throw new Error(`Could not delete objects in DB: ${error}`);
    }
  };

  updateByID = async (lookupID, modified_object) => {
    try {
      await this.model.updateOne({ _id: lookupID }, { $set: modified_object });
    } catch (error) {
      throw new Error(`Could not update object in DB: ${error}`);
    }
  };
}
