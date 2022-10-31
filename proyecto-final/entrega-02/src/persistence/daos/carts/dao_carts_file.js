import Container_File from '../../classes/container_file.js';

export default class DAO_Carts_File extends Container_File {
  constructor(file_path) {
    super(file_path);
  }

  deleteCartProduct = async (cart_ID, product_ID) => {
    try {
      const found_cart = await this.getByID(cart_ID);
      if (found_cart) {
        const found_cart_products = found_cart.products.find(
          (x) => x.id === product_ID
        );
        if (found_cart_products) {
          const new_cart_products = found_cart.products.filter(
            (x) => x.id !== product_ID
          );
          found_cart.products = new_cart_products;
          await this.updateByID(cart_ID, found_cart);
          return { status_code: 200, message: 'Product deleted successfully' };
        } else {
          return { status_code: 404, message: 'Product not found' };
        }
      } else {
        return { status_code: 404, message: 'Cart not found' };
      }
    } catch (error) {
      return {
        status_code: 500,
        message: `Could not delete product from cart: ${error}`,
      };
    }
  };
}
