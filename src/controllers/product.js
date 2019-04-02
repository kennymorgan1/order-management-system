import mongoose from 'mongoose';
import Product from '../models/products';


export default class ProductController {
  static async getAllProducts(req, res) {
    Product.find().then((result) => {
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
      data: err,
    }));
  }

  static async createProduct(req, res) {
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
  }

  static async getOneProduct(req, res) {
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
  }

  static async updateProduct(req, res) {
    let existingRecord;
    Product.findByIdAndUpdate({ _id: req.params.productId }).then((result) => {
      if (result) {
        existingRecord = result;
      }
    }).catch((err) => {
      res.status(500).json({
        status: 500,
        error: err,
      });
    });

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
  }

  static async deleteProduct(req, res) {
    Product.findByIdAndDelete({ _id: req.params.productId }).then(result => res.status(204).json({
      status: 204,
      data: result,
    })).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  }
}
