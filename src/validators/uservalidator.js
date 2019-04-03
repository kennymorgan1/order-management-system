import Joi from 'joi';

export default class UserValidation {
  static createUser(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Joi.string().min(3).max(20).error(new Error('Name must be between 5 to 20 digits')),
      email: Joi.string().email().lowercase().required().error(new Error('Incorrect email supplied')),
      password: Joi.string().min(7).required().strict().error(new Error('Password must be longer than 7 characters')),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict().error(new Error('Does not match password')),
    });

    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({
          status: 400,
          error: err,
        });
      }
      next();
    });
  }
}
