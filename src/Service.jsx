import http from "./http-common";

class TutorialDataService {
  getAll() {
    try {
      return http.get("/shelters");
    } catch (error) {
      console.log("error", error);
    }
  }

  getById(id) {
    try {
      return http.get(`/shelter/${id}`);
    } catch (error) {
      console.log("error", error);
    }
  }

  update(id, data) {
    try {
      return http.put(`/shelter/${id}`, data);
    } catch (error) {
      console.log("error", error);
    }
  }

  delete(id) {
    try {
      return http.delete(`/shelter/${id}`);
    } catch (error) {
      console.log("error", error);
    }
  }
  create(data) {
    try {
      return http.post("/shelter", data);
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default new TutorialDataService();
