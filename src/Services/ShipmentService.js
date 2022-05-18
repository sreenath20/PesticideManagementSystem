import http from "./http-common";

class ShipmentService {
  agree(email,paythrough,paymentid) {
    return http.put(`/review/farmeragree/${email}/${paythrough}/${paymentid}`);
  }

  changeReview(cemail,id){
    return http.put(`/review/changereviewstatus/${cemail}/${id}`)
  }

  addCart(tempPestCart){
    return http.put(`/review/cart`,tempPestCart)
  }

  updateShipment(shipmentTemp){
    return http.put(`/updateshipment`,shipmentTemp);
  }

  getAll(){
    return http.get(`/orderhistory`);
  }
}
export default new ShipmentService();