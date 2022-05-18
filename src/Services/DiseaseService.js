import http from "./http-common";

class DiseaseService {
  getAll() {
    return http.get("/disease");
  }
  get(id) {
    return http.get(`/disease/${id}`);
  }
  getByFarmer(email) {
    return http.get(`/disease/farmer/${email}`);
  }
  getByConsultant(email) {
    return http.get(`/disease/consultant/${email}`);
  }

  getByConsultantReviewStatus(email) {
    return http.get(`/disease/reviewstatus/${email}`);
  }
 
  delete(id) {
    return http.delete(`/disease/${id}`);
  }
  
}
export default new DiseaseService();