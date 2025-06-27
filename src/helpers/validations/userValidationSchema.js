import Joi from 'joi';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const post_userValidationSchema = Joi.object({
  first_name: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': "El campo 'first_name' debe tener como mínimo 3 caracteres",
    'string.max': "El campo 'first_name' debe tener como mucho 30 caracteres",
    'any.required': "El campo 'first_name' es requerido",
    '*': "Revisa el campo 'first_name'",
  }),
  last_name: Joi.string().trim().min(3).max(30).required().messages({
    'string.min': "El campo 'last_name' debe tener como mínimo 3 caracteres",
    'string.max': "El campo 'last_name' debe tener como mucho 30 caracteres",
    'any.required': "El campo 'last_name' es requerido",
    '*': "Revisa el campo 'last_name'",
  }),
  email: Joi.string()
    .trim()
    .min(7)
    .max(50)
    .regex(emailRegex)
    .required()
    .messages({
      'string.min': "El campo 'email' debe tener mínimo 7 caracteres",
      'string.max': "El campo 'email' debe tener maximo 50 caracteres",
      'string.pattern.base': 'El correo debe contener @ y un dominio',
      'any.required': "El campo 'email' es requerido",
      '*': "El campo 'email' tiene algún error",
    }),
  age: Joi.number().integer().min(1).max(100).required().messages({
    'number.base': "El campo 'age' debe ser un número",
    'number.min': "El campo 'age' no puede ser menor a 1",
    'number.max': "El campo 'age' no puede ser mayor a 100",
    'number.integer': "El campo 'age' debe ser un número entero",
    'any.required': "El campo 'age' es requerido",
    '*': "Revisa el campo 'age'",
  }),
  password: Joi.string().trim().regex(passwordRegex).required().messages({
    'string.pattern.base':
      "El campo 'password' debe tener una minúscula, una mayúscula, un dígito, y un caracter especial, entre 8 y 15 caracteres",
    'any.required': "El campo 'password' es requerido",
    '*': "Revisa el campo 'password'",
  }),
});
