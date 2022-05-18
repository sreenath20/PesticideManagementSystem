import http from "./http-common";

class WarehouseOperatorService {
    getAll() {
        return http.get("/warehouseoperator");
      }
      get(email) {
        return http.get(`/warehouseoperator/${email}`);
      }
      create(consultant) {
        return http.post("/warehouseoperator", consultant);
      }
      update(email, consultant) {
        return http.put(`/warehouseoperator/${email}`,consultant);
      }
      delete(email) {
        return http.delete(`/warehouseoperator/${email}`);
      }
      changePassword(email,oldpassword,newpassword){
        return http.put(`/warehouseoperator/${email}/${oldpassword}/${newpassword}`)
      }
}
export default new  WarehouseOperatorService();