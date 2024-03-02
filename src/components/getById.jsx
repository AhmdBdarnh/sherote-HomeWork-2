import { useState } from "react";
import TutorialDataService from "../Service";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import "../style.css";

const GetShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [id, setId] = useState("");
  const [response, setResponse] = useState(null); // State to hold the response message

  const handleGetShelterById = async (id) => {
    try {
      const shelterData = await TutorialDataService.getById(id);
      setShelters([shelterData.data]);
      setResponse(null); // Clear previous response if any
    } catch (error) {
      console.error("Error fetching shelter:", error);
      setResponse("Error fetching shelter. Please try again."); // Set error message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleGetShelterById(id);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="form-control"
                  placeholder="Search by Shelter ID"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {response && ( // Conditionally render response if it exists
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-info" role="alert">
                {response}
              </div>
            </div>
          </div>
        )}
        <div className="row justify-content-center">
          {shelters.map((shelter) => (
            <div key={shelter._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-title">
                    <strong>Name:</strong> {shelter.name}
                  </p>
                  <p className="card-title">
                    <strong>Location:</strong> {shelter.location}
                  </p>
                  <p className="card-title">
                    <strong>Capacity:</strong> {shelter.capacity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetShelters;
