import Joi from "joi";

export const urlSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.uri": "Please provide a valid URL",
    "any.required": "Url is required",
    "string.empty": "Url cannot be empty",
  }),
});
