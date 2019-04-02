import mongoose from 'mongoose';
import Order from '../models/order';


const OrdersController = {
  async getAllOrders(req, res) {
    const result = await Order.find().populate('product');
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
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  },

  async createOrder(req, res) {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.product,
      quantity: req.body.quantity,
    });
    order.save().then(result => res.status(201).json({
      status: 201,
      data: result,
    })).catch(err => res.status(500).json({
      status: 500,
      data: err,
    }));
  },

  async getOneOrder(req, res) {
    Order.findById({ _id: req.params.orderId }).populate('product').then((result) => {
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

  async updateOrder(req, res) {
    const existingRecord = await Order.findByIdAndUpdate({ _id: req.params.orderId });

    existingRecord.product = req.body.product;
    existingRecord.quantity = req.body.quantity;
    await existingRecord.save().then((result) => {
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

  async deleteOrder(req, res) {
    Order.findByIdAndDelete({ _id: req.params.orderId }).then(result => res.status(204).json({
      status: 200,
      data: result,
    })).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  },
};

export default OrdersController;
