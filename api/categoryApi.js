import axiosClient from "./axiosClient";

const categoryApi = {
    getAll(params){
        const url = '/category';
        return axiosClient.get(url , {params:params})
    },

    getById(id){
        const url = `/category/${id}`;
        return axiosClient.get(url)
    },

    add(data){
        const url = `/category/add`;
        return axiosClient.post(url, data)
    },

    update(data) {
        const url = `/category/${data.id}`;
        return axiosClient.patch(url, data)
    },

    remove(id){
        const url = `/category/${id}`;
        return axiosClient.delete(url)
    }
};
export default categoryApi;