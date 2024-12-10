// const logger = require("./utils/logger")("main");
import logger from './utils/logger.js'
import 'dotenv/config.js'
import config from 'config'

const {log, warn} = logger();

log('the script is running!');
warn('test warning');

// console.log(process.env.MY_ENV);
log(config.app_name)


