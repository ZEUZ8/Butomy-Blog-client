import { AxiosURL } from "../BaseUrl";

export const LoginAPI = async (data) => {
        const response = await AxiosURL.post("/login", data);
        console.log(response,' teh res')
        return response;
};

export const RegisterAPI = async (data) => {
        const response = await AxiosURL.post("/register", data);
        return response;
};
