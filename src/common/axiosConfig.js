import axios from 'axios'

import {config as appConfig} from './config.js'

// axios 配置
axios.defaults.baseURL = appConfig.BASE_URL;
axios.defaults.timeout = 30000;
// let loadingInstance = null;
// let needLoadingRequestCount = 0; //当前正在请求的数量

export default axios;