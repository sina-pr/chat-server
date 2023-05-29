const Product = require('../../models/Product');

async function getAllProducts(req, res, next) {
  const products = await Product.find();
  console.log(products);

  res.status(200).json({
    message: 'Product List fetched successfully',
    data: products,
  });
}
async function getProductById(req, res, next) {
  const { pid } = req.params;

  try {
    const Product = await Product.findOne({ pid });
    if (Product) {
      res.status(200).json({
        message: 'Product fetched successfully',
        data: Product,
      });
    }
    res.status(404).json({
      message: `Product with id:${pid} doesn't exist.`,
    });
  } catch {
    res.status(400).json({
      message: 'Something went wrong!',
    });
  }
}

async function createProduct(req, res, next) {
  const { name, description } = req.body;
  const newProduct = new Product({
    name,
    description,
  });

  await newProduct.save();

  res.status(200).json({
    message: 'Product created successfully',
    data: newProduct,
  });
}

async function deleteProduct(req, res, next) {
  const { pid } = req.params;

  const product = await Product.deleteOne({ _id: pid });
  res.status(200).json({
    message: 'Product deleted successfully',
    data: product,
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
