const express = require('express');
const {
  authorizeBearerToken,
  authorizeRole,
} = require('../middlewares/jsonwebtoken');

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require('../controllers/products');

// initialize router
const router = express.Router();

router.get('/getAll', getAllProducts);

router.get('/:pid', [authorizeBearerToken], getProductById);
router.post(
  '/new',
  [authorizeBearerToken, authorizeRole(['ADMIN'])],
  createProduct
);
router.delete(
  '/delete/:pid',
  [authorizeBearerToken, authorizeRole(['ADMIN'])],
  deleteProduct
);

module.exports = router;
