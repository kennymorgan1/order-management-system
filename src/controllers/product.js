import mongoose from 'mongoose';
import Product from '../models/products';


const ProductController = {
  async getAllProducts(req, res) {
    const result = await Product.find();
    try {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        data: err,
      });
    }
  },

  async createProduct(req, res) {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });
    product.save().then(result => res.status(201).json({
      status: 201,
      data: result,
    })).catch(err => res.status(500).json({
      status: 500,
      data: err,
    }));
  },

  async getOneProduct(req, res) {
    Product.findById({ id: req.params.productId }).then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  },

  async updateProduct(req, res) {
    const existingRecord = await Product.findByIdAndUpdate({ _id: req.params.productId });

    existingRecord.name = req.body.name;
    existingRecord.price = req.body.price;

    existingRecord.save().then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  },

  async deleteProduct(req, res) {
    Product.findByIdAndDelete({ _id: req.params.productId }).then(result => res.status(204).json({
      status: 200,
      data: result,
    })).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  },
};

export default ProductController;
