import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();
const router = express.Router();

router.post('/signup', (req, res) => {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length >= 1) {
      res.status(409).json({
        message: 'User with same email already exist',
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            status: 500,
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });
          user.save().then((result) => {
            return res.status(201).json({
              status: 201,
              message: 'user created',
              data: result,
            });
          }).catch((er) => {
            return res.status(500).json({
              status: 500,
              data: er,
            });
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length < 1) {
      res.send(401).json({
        status: 401,
        message: 'Auth failed',
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        res.send(401).json({
          status: 401,
          message: 'Auth failed',
        });
      }
      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
        )
        res.status(200).json({
          status: 200,
          message: 'Auth successful',
          token,
          data: result,
        });
      }
      res.send(401).json({
        status: 401,
        message: 'Auth failed',
    });
  });
});

router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId }).then((result) => {
    return res.status(204).json({
      status: 204,
      message: 'user deleted',
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
