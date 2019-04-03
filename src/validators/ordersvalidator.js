import Joi from 'joi';

export default class OrderValidation {
  static createOrder(req, res, next) {
    const schema = Joi.object().keys({
      product: Joi.string().required().error(new Error('Product is required')),
      quantity: Joi.number().error(new Error('quantity should be a number')),
    });

    // eslint-disable-next-line consistent-return
    Joi.validate(req.body, schema, (err) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({
          status: 400,
          error: err.message,
        });
      }
      next();
    });
  }
}
