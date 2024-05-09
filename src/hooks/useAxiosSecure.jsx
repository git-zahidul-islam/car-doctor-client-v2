import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-server-v2-ashen.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use((res) => {
            return res;
        }, error => {
            console.log("this is the interceptor", error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("logout the page");
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
                    .then(error => console.error(error))
            }
        })
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;