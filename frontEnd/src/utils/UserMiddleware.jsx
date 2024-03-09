import axios from "axios";
import toast from "react-hot-toast";

const baseURL=import.meta.env.CLIENTURL


const axiosInterceptorInstance = axios.create({
    baseURL:"http://localhost:3000/"||baseURL
});

axiosInterceptorInstance.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("userToken");
    }
    return req;
});

axiosInterceptorInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
            setTimeout(()=>{
                    localStorage.removeItem('userToken')
                window.location('/login')
            },2000 )
        } else if (error.response && error.response.status === 409) {
            toast.error(error.response.data.message);
        
           
        } else if (error.response && error.response.status === 404) {
            toast.error(error.response.data.message);
            
            
        } else if (error.response && error.response.status === 500) {
            toast.error(error.response.data.message);
        
           
        } else if (error.response && error.response.status === 401) {
            toast.error(error.response.data.message);
          
            
        }
        return Promise.reject(error);
    }
);

export default axiosInterceptorInstance;