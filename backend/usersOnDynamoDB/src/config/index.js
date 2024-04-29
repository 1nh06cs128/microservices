import dotenv from 'dotenv'

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotenv.config({ path: configFile });
} else {
    dotenv.config();
}

const USER_CONFIG = {
    PORT: process.env.PORT,
    AWS_CREDS: {
        TABLE_NAME: process.env.aws_table_name,
        REMOTE_CONFIG: {
            ACCESSKEY: {
                ID: process.env.accessKeyId,
                SECRET: process.env.secretAccessKey
            },
            REGION: process.env.region,
        },
        LOCAL_CONFIG: {
            //Provide details for local configuration
        }
    },
    BASE_URL: process.env.BASE_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    // MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
    // CUSTOMER_SERVICE: "customer_service",
    // SHOPPING_SERVICE: "shopping_service",
    // CATALOGUE_SERVICE: "catalogue_service",
};

export { USER_CONFIG };