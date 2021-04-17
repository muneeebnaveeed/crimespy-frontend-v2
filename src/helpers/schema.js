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

export const postSchema = Joi.object({
    title: Joi.string().max(70).required().min(9).messages({
        "string.empty": `Title is required`,
        "any.required": `Title is required`,
        "string.max": `Only {#limit} characters are allowed`,
        "string.min": `Please Enter a title above the limit {#limit}`,
    }),
    description: Joi.string().required().min(150).messages({
        "string.empty": `Description is required`,
        "any.required": `Description is required`,
        "string.min": `Please Enter comprehensive Description above {#limit} limit`,
    }),
    location: Joi.string().required().min(10).max(255).messages({
        "string.empty": `Location is required`,
        "any.required": `Location is required`,
        "string.max": `Only {#limit} characters are allowed`,
        "string.min": `Please Enter comprehensive Description above the limit {#limit} characters`,
    }),
    image: Joi.any().required().messages({
        "string.empty": `Please attach an image`,
        "any.required": `Please attach an image`,
    }),
});

export const userSchema = Joi.object({
    fullname: Joi.string().max(50).required().min(10).messages({
        "string.empty": `Title is required`,
        "any.required": `Title is required`,
        "string.max": `Only {#limit} characters are allowed`,
        "string.min": `Please Enter a title above the limit {#limit}`,
    }),
    gender: Joi.string().required().messages({
        "string.required": "Nothing is also binary bitch!",
    }),
    dob: Joi.string().required().messages({
        "any.required": `Gender is required`,
    }),
});
export const bioSchema = {
    job: Joi.string().required().min(10).max(255).messages({
        "any.required": `Location is required`,
        "string.max": `Only {#limit} characters are allowed`,
        "string.min": `Please Enter comprehensive Description above the limit {#limit} characters`,
    }),
    address: Joi.string().required().min(10).max(255).messages({
        "any.required": `Location is required`,
        "string.max": `Only {#limit} characters are allowed`,
        "string.min": `Please Enter comprehensive Description above the limit {#limit} characters`,
    }),
    qaulification: Joi.string().required().min(10).max(255).messages({
        "any.required": `Qualification is required`,
        "string.max": `Only {#limit} characters are allowed`,
        "string.min": `Please Enter comprehensive Description above the limit {#limit} characters`,
    }),
};

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
