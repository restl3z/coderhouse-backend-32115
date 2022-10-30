import fs from 'fs';

export default class Container_File {
  constructor(file_path) {
    this.file_path = file_path;
  }

  getAll = async () => {
    try {
      const file_content = await fs.promises.readFile(this.file_path, 'utf-8');
      return JSON.parse(file_content);
    } catch (error) {
      throw new Error(`Could not read file: ${error.message}`);
    }
  };

  save = async (new_object) => {
    try {
      const file_content = await this.getAll();
      file_content.length > 0
        ? (new_object.id = file_content[file_content.length - 1].id + 1)
        : (new_object.id = 1);
      new_object.timestamp = new Date().toLocaleString();
      file_content.push(new_object);
      await fs.promises.writeFile(this.file_path, JSON.stringify(file_content));
      return new_object.id;
    } catch (error) {
      throw new Error(`Could not write to file: ${error.message}`);
    }
  };

  getByID = async (lookupID) => {
    try {
      const file_content = await this.getAll();
      const found_object = file_content.find((x) => x.id === lookupID);
      return found_object;
    } catch (error) {
      throw new Error(`Could not find object: ${error.message}`);
    }
  };

  deleteByID = async (lookupID) => {
    const file_content = await this.getAll();
    const filtered_content = file_content.filter((x) => x.id !== lookupID);
    try {
      await fs.promises.writeFile(
        this.file_path,
        JSON.stringify(filtered_content)
      );
    } catch (error) {
      throw new Error(`Could not delete object: ${error.message}`);
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.file_path, JSON.stringify([]));
    } catch (error) {
      throw new Error(`Could not delete objects: ${error.message}`);
    }
  };

  updateByID = async (lookupID, modified_object) => {
    try {
      const file_content = await this.getAll();
      const updated_content = file_content;
      const lookup_index = file_content.findIndex((x) => x.id === lookupID);
      modified_object.id = lookupID;
      updated_content[lookup_index] = modified_object;
      await fs.promises.writeFile(
        this.file_path,
        JSON.stringify(updated_content)
      );
      return modified_object;
    } catch (error) {
      throw new Error(`Could not update object: ${error.message}`);
    }
  };
}
