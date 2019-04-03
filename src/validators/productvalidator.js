import Joi from 'joi';

export default class ProductValidation {
  static createProduct(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).max(20).required()
        .error(new Error('Name is required and should be between 3 t0 20 characters')),
      price: Joi.number().required().error(new Error('price should be a number')),
    });

    Joi.validate(req.body, schema, (err) => {
      if (err) {
        res.status(400).json({
          status: 400,
          err: err.message,
        });
      }
      next();
    });
  }
}
