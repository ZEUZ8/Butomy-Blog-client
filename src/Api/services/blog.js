import { AxiosURL } from "../BaseUrl";

export const BlogCreate = async (data, token) => {
    
    try {
        const response = AxiosURL.post("/blog", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
       
        return error?.response;
    }
};

export const GetAllBlog = async () => {
    try {
        
        const response = AxiosURL.get("/");
        return response;
    } catch (error) {
       
        return error?.response;
    }
};

export const SingleBlog = async (id) => {
    try {
        const response = AxiosURL.get(`/blog/${id}`);
        return response;
    } catch (error) {
        
        return error?.response;
    }
};
export const DeleteBlog = async (id, token) => {
    try {
        const response = AxiosURL.delete(`/blog/${id}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
       
        return error?.response;
    }
};

export const EditBlogAPI = async (data, token) => {
    try {
        const response = AxiosURL.put(`/edit`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
       
        return error?.response;
    }
};