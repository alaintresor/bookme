import Joi from 'joi';

export const signupAuthSchema = Joi.object({
  username: Joi.string().alphanum().required(),

  firstName: Joi.string().alphanum().required(),

  lastName: Joi.string().alphanum().required(),

  birthDate: Joi.date(),

  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    .required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),

  role: Joi.string(),

  gender: Joi.string(),

  password: Joi.string()
    .min(5)
    .pattern(new RegExp('^[a-zA-Z]{3,30}$'))
    .max(8)
    .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string().lowercase().email().required(),
});

export const updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().required(),

  firstName: Joi.string().alphanum().required(),

  lastName: Joi.string().alphanum().required(),

  birthDate: Joi.date(),

  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    .required(),

  gender: Joi.string(),
  image: Joi.string(),
  email: Joi.string().lowercase().email().required(),
  preferredLanguage: Joi.string().alphanum(),
  preferredCurrency: Joi.string(),
  department: Joi.string(),
  lineManager: Joi.string(),
});

export const tripRequestSchema = Joi.object({
  leavingFrom: Joi.string().allow(''),
  goingTo: Joi.number().required(),
  travelDate: Joi.string().required(),
  returnDate: Joi.string(),
  travelReason: Joi.string().required(),
  accomodationId: Joi.number().required(),
  roomId: Joi.number().required(),
  passportName: Joi.string().allow(''),
  passportNumber: Joi.string().allow(''),
});
export const tripRequestUpdateSchema = Joi.object({
  leavingFrom: Joi.string().required(),
  travelDate: Joi.string().required(),
  returnDate: Joi.string(),
  travelReason: Joi.string().required(),
});
