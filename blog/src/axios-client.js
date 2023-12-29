import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer 25c734db50db4f002f293b860b85639ea5e85504ea277286004eedf0a7415858`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem("IS_LOGGED_IN");
    }
    throw error;
  },
);

export default axiosClient;
