import http from "./http-common";

class PesticideService {
  getAll() {
    return http.get("/pesticide");
  }
  get(id) {
    return http.get(`/pesticide/${id}`);
  }
  create(pesticide) {
    return http.post("/pesticide", pesticide);
  }

  update(id,pesticidesUpdateTemp) {
    return http.put(`/pesticide/update/${id}`,pesticidesUpdateTemp);
  }
 
  delete(id) {
    return http.delete(`/pesticide/${id}`);
  }
 
}
export default new PesticideService();