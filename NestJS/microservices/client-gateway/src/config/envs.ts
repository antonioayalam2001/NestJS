import * as Joi from 'joi'

interface EnvVars {
    PORT: number,
    DATABASE_URL: string
    PRODUCTS_MICROSERVICE_HOST: string
    PRODUCTS_MICROSERVICE_PORT: number,
    ORDERS_MICROSERVICE_HOST: string
    ORDERS_MICROSERVICE_PORT: number,
}

export const ENV_VARS = Joi.object({
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string(),
    PRODUCTS_MICROSERVICE_HOST: Joi.string().default("localhost"),
    PRODUCTS_MICROSERVICE_PORT: Joi.number().default(3001),
    ORDERS_MICROSERVICE_HOST: Joi.string().default("localhost"),
    ORDERS_MICROSERVICE_PORT: Joi.number().default(3002),
}).unknown(true)


const { error, value } = ENV_VARS.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
    ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
    ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT
} 