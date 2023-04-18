//import file axios da duoc cau hinh de lay duoc api,
//chu khong phai import thu vien axios

import axios from "../axios";
const handleLogin = (email, password) => {
    return axios.post("/api/login", { email, password });
};
const getAllUsers = (userId) => {
    //template string
    return axios.get("/api/get-all-users", {
        params: {
            id: userId,
        },
    });
};
const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {
        // headers: {
        //   Authorization: authorizationToken
        // },
        data: {
            id: userId,
        },
    });
};
const editUserService = (userData) => {
    return axios.put("/api/edit-user", userData);
};
export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
};