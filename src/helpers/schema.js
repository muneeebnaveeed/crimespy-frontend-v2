import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().max(25).required().messages({
    "string.empty": `Name is required`,
    "any.required": `Name is required`,
    "string.max": `Only {#limit} characters are allowed`,
  }),
  category: Joi.string().required().messages({
    "string.empty": `Category is required`,
    "any.required": `Category is required`,
  }),
  price: Joi.number().required().messages({
    "string.empty": `Price is required`,
    "any.required": `Price is required`,
    "number.base": `Please enter price in numbers`,
  }),
});

export const categorySchema = {
  name: Joi.string().max(25).required().messages({
    "string.empty": `Name is required`,
    "any.required": `Name is required`,
    "string.max": `Only {#limit} characters are allowed`,
  }),
};

export const unitSchema = {
  name: Joi.string().max(25).required().messages({
    "string.empty": `Name is required`,
    "any.required": `Name is required`,
    "string.max": `Only {#limit} characters are allowed`,
  }),
  baseUnit: {
    is_base: Joi.boolean(),
  },
  derivedUnit: {
    multiplier: Joi.number().required().messages({
      "string.empty": `Value is required`,
      "any.required": `Value is required`,
      "number.base": `Please enter value in numbers`,
    }),
    unit: Joi.string().required().messages({
      "string.empty": `Unit is required`,
      "any.required": `Unit is required`,
    }),
  },
};
