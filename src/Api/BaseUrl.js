import Axios from "axios";
export const AxiosURL = Axios.create({
    baseURL: "http://localhost:3000/",
});
