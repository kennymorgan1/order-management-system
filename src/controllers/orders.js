import mongoose from 'mongoose';
import Order from '../models/order';


export default class OrdersController {
  static async getAllOrders(req, res) {
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
    }).catch(err => res.status(500).json({
      status: 500,
      data: err,
    }));
  }

  static async getOneOrder(req, res) {
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
    }).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  }

  static async createOrder(req, res) {
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
  }

  static async updateOrder(req, res) {
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
    }).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  }

  static async deleteOrder(req, res) {
    Order.findByIdAndDelete({ _id: req.params.OrderId }).then(result => res.status(204).json({
      status: 204,
      data: result,
    })).catch(err => res.status(500).json({
      status: 500,
      error: err,
    }));
  }
}
