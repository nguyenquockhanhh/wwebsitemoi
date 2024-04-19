import axiosClient from "./axiosClient";

const sanphamApi = {
    getAll(params){
        const url = '/sanpham';
        return axiosClient.get(url , {params:params})
    },

    getById(id){
        const url = `/sanpham/${id}`;
        return axiosClient.get(url)
    },

    add(data){
        const url = `/sanpham/add`;
        return axiosClient.post(url, data)
    },
    checkout(data){
        const url = `/sanpham/checkout`;
        return axiosClient.post(url, data)
    },


    update(data) {
        const url = `/sanpham/${data.id}`;
        return axiosClient.patch(url, data)
    },

    remove(id){
        const url = `/sanpham/${id}`;
        return axiosClient.delete(url)
    }
};
export default sanphamApi;