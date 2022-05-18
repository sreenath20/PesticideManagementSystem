import http from "./http-common";

class CountService {

    diseaseCount() {
        return http.get(`/diseasecount`);
    }
    diseaseCountByFarmer(email) {
        return http.get(`/diseasecountbyfarmer/${email}`);
    }


    diseaseCountByConsultant(email) {
        return http.get(`/diseasecountbyconsultant/${email}`);
    }

    diseaseCountByConsultantAndReviewStatus(email, reviewStatus) {
        return http.get(`/diseasecountbyconsultantandreview/${email}/${reviewStatus}`);
    }

    countByReviewStatus(reviewStatus) {
        return http.get(`/diseasecountbyreviewstatus/${reviewStatus}`);
    }

    countByFarmerAndReviewStatus(email, reviewStatus) {
        return http.get(`/diseasecountbyfarmerandreviewstatus/${email}/${reviewStatus}`);
    }

    countByDeliverPerson(email) {
        return http.get(`/deliverpersoncount/${email}`);
    }
    countByDeliverPersonAndShipmentStatus(email, status) {
        return http.get(`/deliverpersonshipmentcount/${email}/${status}`);
    }

    consultantCount() {
        return http.get(`/consultantcount`);
    }


    warehouseOperatorCount() {
        return http.get(`/warehouseoperatorcount`);
    }


    farmerCount() {
        return http.get(`/farmercount`);
    }


    deliverPersonCount() {
        return http.get(`/deliverpersoncount`);
    }

    shipmentCount(shipmentStatus) {
        return http.get(`/shipmentcount/${shipmentStatus}`);
    }

   pesticideCount(){
        return http.get(`/pesticidecount`);
    }

   pesticideCountByAvailableQty(){
        return http.get(`/pesticidecountbyavailableqty`);
    }

}
export default new CountService();




