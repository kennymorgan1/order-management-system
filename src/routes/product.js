import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check_auth';
import Product from '../models/products';


const router = express.Router();

router.get('/', (req, res) => {
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
  }).catch((err) => {
    return res.status(500).json({
      status: 500,
      data: err,
    });
  });
});

router.post('/', checkAuth, (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product.save().then((result) => {
    return res.status(201).json({
      status: 201,
      data: result,
    });
  }).catch((err) => {
    return res.status(500).json({
      status: 500,
      data: err,
    });
  });
});

router.get('/:producctId', (req, res) => {
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
  }).catch((err) => {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  });
});

router.patch('/:product', checkAuth, (req, res) => {
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
  }).catch((err) => {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  });
});

router.delete('/:productId', checkAuth, (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.productId }).then((result) => {
    return res.status(204).json({
      status: 204,
      data: result,
    });
  }).catch((err) => {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  });
});

export default router;
