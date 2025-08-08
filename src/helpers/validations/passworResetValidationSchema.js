import Joi from 'joi';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

export const forgotPasswordValidationSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'El email debe tener un formato válido',
    'any.required': "El campo 'email' es requerido",
    '*': "Revisa el campo 'email'",
  }),
});

export const resetPasswordValidationSchema = Joi.object({
  token: Joi.string().trim().required().messages({
    'any.required': 'El token es requerido',
    '*': 'Token inválido',
  }),
  newPassword: Joi.string().trim().regex(passwordRegex).required().messages({
    'string.pattern.base':
      'La contraseña debe tener una minúscula, una mayúscula, un dígito, y un caracter especial, entre 8 y 15 caracteres',
    'any.required': 'La nueva contraseña es requerida',
    '*': 'Revisa la nueva contraseña',
  }),
});
