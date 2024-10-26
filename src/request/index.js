import axios from 'axios';
import config from './config'
import { reqInterceptor, resInterceptor, errInterceptor } from "./interceptor"

const instance = axios.create({...config});

instance.interceptors.request.use(reqInterceptor);
instance.interceptors.response.use(resInterceptor, errInterceptor);

export default instance;
export { instance };
