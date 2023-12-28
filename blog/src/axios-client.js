import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer dd1c6c51ab797332ea47d067e3d5f9f16e09348463e3da1aa671dff175a64a25`;
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
