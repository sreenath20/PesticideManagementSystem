import http from "./http-common";

class AdminService{
 
  get(email) {
    return http.get(`/admin/${email}`);
  }
  create(admin) {
    return http.post("/admin", admin);
  }
  update(email, admin) {
    return http.put(`/admin/${email}`, admin);
  }
  delete(email) {
    return http.delete(`/admin/${email}`);
  }
  changePassword(email,oldpassword,newpassword){
    return http.put(`/admin/changepassword/${email}/${oldpassword}/${newpassword}`)
  }
}
export default new AdminService();