import http from "./http-common";

class DeliverPersonService{

 getAll() {
    return http.get(`/deliverperson`);
  }

  get(email) {
    return http.get(`/deliverperson/${email}`);
  }
  create(deliverPerson) {
    return http.post("/deliverperson", deliverPerson);
  }
  update(email, deliverPerson) {
    return http.put(`/deliverperson/${email}`, deliverPerson);
  }
  delete(email) {
    return http.delete(`/deliverperson/${email}`);
  }
  changePassword(email,oldpassword,newpassword){
    return http.put(`/deliverperson/changepassword/${email}/${oldpassword}/${newpassword}`)
  }
}
export default new DeliverPersonService();