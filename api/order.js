import axiosClient from "./axiosClient";

const orderApi = {
    getAll(params){
        const url = '/order';
        return axiosClient.get(url , {params:params})
    },

    getOrderById(id){
        const url = `/order/byUserId/${id}`;
        return axiosClient.get(url)
    },

    getById(id){
        const url = `/order/${id}`;
        return axiosClient.get(url)
    },

    add(data){
        const url = `/order/add`;
        return axiosClient.post(url, data)
    },
    checkout(data){
        const url = `/order/checkout`;
        return axiosClient.post(url, data)
    },


    update(data) {
        const url = `/order/${data.id}`;
        return axiosClient.patch(url, data)
    },

    remove(id){
        const url = `/order/${id}`;
        return axiosClient.delete(url)
    }
};
export default orderApi;