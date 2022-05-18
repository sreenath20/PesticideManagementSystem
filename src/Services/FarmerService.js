import http from "./http-common";

class FarmerService {
  getAll() {
    return http.get("/farmer");
  }
  get(id) {
    return http.get(`/farmer/${id}`);
  }
  getByDisease(id) {
    return http.get(`/farmer/disease/${id}`);
  }
  getOrderHistoryByDisease(id) {
    return http.get(`/farmer/orderhistory/${id}`);
  }
  create(farmer) {
    return http.post("/farmer", farmer);
  }
  update(email, farmer) {
    return http.put(`/farmer/${email}`, farmer);
  }
  delete(email) {
    return http.delete(`/farmer/${email}`);
  }
  changePassword(email,oldpassword,newpassword){
    return http.put(`/farmer/changepassword/${email}/${oldpassword}/${newpassword}`)
  }
}
export default new FarmerService();