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
    'string.pattern.base':
      "El campo 'code' debe contener 3 letras mayúsculas seguidas de 5 números",
    'any.required': "El campo 'code' es requerido",
    '*': "Revisa el campo 'code'",
  }),
  price: Joi.number().integer().min(1).required().messages({
    'any.required': "El campo 'price' es requerido",
    '*': "Revisa el campo 'price'",
  }),
  stock: Joi.number().integer().required().messages({
    'any.required': "El campo 'stock' es requerido",
    '*': "Revisa el campo 'stock'",
  }),
  category: Joi.string().trim().required().messages({
    'any.required': "El campo 'category' es requerido",
    '*': "Revisa el campo 'category'",
  }),
});

export const put_productValidationSchema = Joi.object({
  name: Joi.string().trim().messages({
    '*': "Revisa el campo 'name'",
  }),
  description: Joi.string().trim().messages({
    '*': "Revisa el campo 'description'",
  }),
  code: Joi.string().trim().regex(codeRegex).messages({
    'string.pattern.base':
      "El campo 'code' debe contener 3 letras mayúsculas seguidas de 5 números",
    '*': "Revisa el campo 'code'",
  }),
  price: Joi.number().integer().min(1).messages({
    '*': "Revisa el campo 'price'",
  }),
  stock: Joi.number().integer().messages({
    '*': "Revisa el campo 'stock'",
  }),
  category: Joi.string().trim().messages({
    '*': "Revisa el campo 'category'",
  }),
})
  .min(1)
  .messages({
    'object.min': 'Debes proporcionar al menos un campo para actualizar',
  });
