import Joi from 'joi';

const codeRegex = /^[A-Za-z]{3}[0-9]{5}$/;

export const post_productValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': "El campo 'name' es requerido",
    '*': "Revisa el campo 'name'",
  }),
  description: Joi.string().trim().required().messages({
    'any.required': "El campo 'description' es requerido",
    '*': "Revisa el campo 'description'",
  }),
  code: Joi.string().trim().regex(codeRegex).required().messages({
    'any.required': "El campo 'code' es requerido",
    '*': "Revisa el campo 'code'",
  }),
  price: Joi.number().integer().min(1).required().messages({
    'any.required': "El campo 'price' es requerido",
    '*': "Revisa el campo 'price'",
  }),
  stock: Joi.number().integer().min(1).required().messages({
    'any.required': "El campo 'stock' es requerido",
    '*': "Revisa el campo 'stock'",
  }),
  category: Joi.string().trim().required().messages({
    'any.required': "El campo 'category' es requerido",
    '*': "Revisa el campo 'category'",
  }),
});
