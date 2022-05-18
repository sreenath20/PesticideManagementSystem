import http from "./http-common";

class ConsultantService {
  getAll() {
    return http.get("/consultant");
  }
  get(email) {
    return http.get(`/consultant/${email}`);
  }
  create(consultant) {
    return http.post("/consultant", consultant);
  }
  update(email, consultant) {
    return http.put(`/consultant/${email}`,consultant);
  }
  delete(email) {
    return http.delete(`/consultant/${email}`);
  }
  changePassword(email,oldpassword,newpassword){
    return http.put(`/consultant/${email}/${oldpassword}/${newpassword}`)
  }
  
}
export default new ConsultantService();