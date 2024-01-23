import { 
    ROCKO_DB_HOST, 
    ROCKO_DB_USER, 
    ROCKO_DB_PASSWORD, 
    ROCKO_DB_DATABASE 
} from "../constants";

const config = {
    host: ROCKO_DB_HOST,
    user: ROCKO_DB_USER,
    password: ROCKO_DB_PASSWORD,
    database: ROCKO_DB_DATABASE,
};

module.exports = config;