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
        console.log(id)
        const response = AxiosURL.delete(`/blog/${id}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
       
        return error?.response;
    }
};

export const editBlog = async ({title,summary,img,content,id,token}) => {
    console.log(id,' th')
    try {
        const response = AxiosURL.put(`/edit`, {id,title,img,summary,content}, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
       
        return error?.response;
    }
};

export const GetUserBlogs = async (id, token) => {
    try {
        const response = AxiosURL.get(`/blogs/${id}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
       
        return error?.response;
    }
};

