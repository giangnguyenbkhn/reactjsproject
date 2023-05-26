//import file axios da duoc cau hinh de lay duoc api,
//chu khong phai import thu vien axios
// day la file giup ket noi duoc api tu fe den be

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
//tim kiemnguoi dung theo thanh search
const getKeyUser = (keySearch) => {
  return axios.post("/api/get-user-by-key", {
    nameSearch: keySearch.keySearchName,
    genderSearch: keySearch.keySearchGender,
  });
};
//
// const getKeyGender = (keyGender) => {
//   return axios.post("/api/get-user-by-gender", { gender: keyGender });
// };
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
const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};
const saveDetailDoctors = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};
const getDetailDoctorService = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
export {
  handleLogin,
  getAllUsers,
  getKeyUser,
  // getKeyGender,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctors,
  getDetailDoctorService,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
};
