import http from "./http-common";

class LoginService {

  login(loginDTO) {
    return http.put("/login",loginDTO);
  }
  getFarmer(){
     return http.get("/responsefarmer", {withCredentials: true});
  }
  getConsultant(){
    return http.get("/responseconsultant", {withCredentials: true});
 }
 getAdmin(){
  return http.get("/responseadmin", {withCredentials: true});
}
getOperator(){
  return http.get("/responsewarehouseoperator", {withCredentials: true});
}
getDeliveryPerson(){
  return http.get("/responsedeliverperson", {withCredentials: true});
}
  logout(logoutDTO){
    return http.put("/logout",logoutDTO);
  }
  forgetpassword(email){
    return http.get(`/forgetpassword/${email}`);
  }
  
}
export default new LoginService();