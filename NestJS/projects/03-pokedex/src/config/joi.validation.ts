import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    MONGODB_URI: Joi.required(),
    PORT: Joi.required().default(3002),
    DEFAULT_LIMIT: Joi.number().default(1),
}) 
