import firebase_connect from '../config/firebase_config.js';

const firebase_db = firebase_connect;

export default class Container_Firebase {
  constructor(collection_name) {
    this.coll = firebase_db.collection(collection_name);
  }

  getAll = async () => {
    try {
      const snapshot = await this.coll.get();
      const product_list = [];
      snapshot.forEach((x) => {
        product_list.push(x.data());
      });
      return product_list;
    } catch (error) {
      throw new Error(`Could not read Firebase DB: ${error}`);
    }
  };

  save = async (new_object) => {
    try {
      const firebase_content = await this.getAll();
      firebase_content.length === 0
        ? (new_object.id = 1)
        : (new_object.id = firebase_content.length + 1);
      new_object.timestamp = new Date().toLocaleString();
      await this.coll.doc().set(new_object);
      return new_object.id;
    } catch (error) {
      throw new Error(`Could not write to Firebase DB: ${error}`);
    }
  };

  getByID = async (lookupID) => {
    try {
      const firebase_content = await this.getAll();
      let found_object = firebase_content.find((x) => x.id == lookupID);
      if (!found_object) {
        found_object = null;
      }
      return found_object;
    } catch (error) {
      throw new Error(`Could not find object in Firebase DB: ${error}`);
    }
  };

  deleteByID = async (lookupID) => {
    try {
      const firebase_content = await this.getAll();
      const found_object = firebase_content.find((x) => x.id == lookupID);
      if (found_object) {
        const query = await this.coll
          .where('id', '==', parseInt(lookupID))
          .get();
        query.forEach(async (x) => {
          await this.coll.doc(x.id).delete();
        });
      }
      return found_object;
    } catch (error) {
      throw new Error(`Could not delete object in Firebase DB: ${error}`);
    }
  };

  deleteAll = async () => {
    try {
      await this.coll.get().then((x) => {
        x.forEach((y) => {
          y.ref.delete();
        });
      });
    } catch (error) {
      throw new Error(`Could not delete objects in Firebase DB: ${error}`);
    }
  };

  updateByID = async (lookupID, modified_object) => {
    try {
      const firebase_content = await this.getAll();
      const found_object = firebase_content.find((x) => x.id == lookupID);
      if (found_object) {
        const query = await this.coll
          .where('id', '==', parseInt(lookupID))
          .get();
        modified_object.timestamp = new Date().toLocaleString();
        query.forEach(async (x) => {
          await this.coll.doc(x.id).update(modified_object);
        });
      }
      return found_object;
    } catch (error) {
      throw new Error(`Could not update object in Firebase DB: ${error}`);
    }
  };
}
