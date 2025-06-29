import Joi from 'joi';

export const post_loginValidationSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    'any.required': "El campo 'email' es requerido",
    '*': "Revisa el campo 'email'",
  }),
  password: Joi.string().trim().required().messages({
    'any.required': "El campo 'password' es requerido",
    '*': "Revisa el campo 'password'",
  }),
});
