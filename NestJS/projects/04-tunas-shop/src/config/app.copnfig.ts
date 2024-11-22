export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 3000,
    POSTGRESS_PASSWORD: process.env.POSTGRESS_PASSWORD  || "root" ,
    POSTGRESS_USER: process.env.POSTGRESS_USER  || "postgres" ,
    DB_NAME: process.env.DB_NAME  || "TunasShop" ,
    DB_HOST: process.env.DB_HOST  || "localhost" ,
    DB_PORT: process.env.DB_PORT  || 5432 ,
    HOST_API: process.env.HOST_API || "http://localhost:3000/api",
    JWT_SECRET: process.env.JWT_SECRET || "SecretoQueNadieDebeConocer" 
})