import express from 'express';
import mongoose from 'mongoose';
import checkAuth from '../middleware/check_auth';
import Order from '../models/order';


const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  Order.find().populate('product', 'name').then()((result) => {
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
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    quantity: req.body.quantity,
  });
  order.save().then((result) => {
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

router.get('/:producctId', checkAuth, (req, res) => {
  Order.findById({ id: req.params.OrderId }).populate('product').then((result) => {
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

router.patch('/:Order', checkAuth, (req, res) => {
  let existingRecord;
  Order.findByIdAndUpdate({ _id: req.params.OrderId }).then((result) => {
    if (result) {
      existingRecord = result;
    }
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      error: err,
    });
  });

  existingRecord.product = req.body.product;
  existingRecord.quantity = req.body.quantity;

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

router.delete('/:OrderId', checkAuth, (req, res) => {
  Order.findByIdAndDelete({ _id: req.params.OrderId }).then((result) => {
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
