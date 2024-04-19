import axiosClient from "./axiosClient";

const authApi = {
    login(credentials) {
        const url = '/auth/login';
        return axiosClient.post(url, credentials);
    },

    register(userInfo) {
        const url = '/auth/register';
        return axiosClient.post(url, userInfo);
    }, 
    logout() {
        const url = '/auth/logout';
        return axiosClient.post(url);
    },
    forgotpassword(email){
        const url = '/auth/forgotpassword';
        return axiosClient.post(url ,email);
          
    },
    resetpassword(userInfo){
        const url = '/auth/resetpassword';
        return axiosClient.post(url ,userInfo);
          
    }
    

    // Các phương thức khác như lấy thông tin người dùng, cập nhật thông tin người dùng, đăng xuất, vv. có thể được thêm vào đây.
};

export default authApi;
