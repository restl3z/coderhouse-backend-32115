import fs from 'fs';

export default class Container {
  constructor(file_path) {
    this.file_path = file_path;
  }

  get_all = async () => {
    try {
      const file_content = await fs.promises.readFile(this.file_path, 'utf-8');
      return JSON.parse(file_content);
    } catch (error) {
      console.log(`Error reading from file. Details: ${error}`);
    }
  };

  get_all_collection = async () => {
    try {
      const file_content = await this.get_all();
      return file_content.collection;
    } catch (error) {
      console.log(`Error reading from file. Details: ${error}`);
    }
  };

  save = async (new_object) => {
    try {
      const file_content = await this.get_all();
      const content_collection = file_content.collection;
      content_collection.length === 0
        ? (new_object.id = 1)
        : (new_object.id =
            content_collection[content_collection.length - 1].id + 1);
      content_collection.push(new_object);
      file_content.collection = content_collection;
      await fs.promises.writeFile(
        this.file_path,
        JSON.stringify(file_content, null, 2)
      );
    } catch (error) {
      console.log(`Error writing to file. Details: ${error}`);
    }
  };
}
