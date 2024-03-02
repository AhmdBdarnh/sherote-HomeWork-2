import { useState, useEffect } from "react";
import TutorialDataService from "../Service";
import "../style.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

const GetShelters = () => {
  const [shelters, setShelters] = useState([]);

  const handleGetAllShelters = async () => {
    try {
      const sheltersData = await TutorialDataService.getAll();
      setShelters(sheltersData.data);
    } catch (error) {
      console.error("Error fetching shelters:", error);
    }
  };

  useEffect(() => {
    handleGetAllShelters();
  }, []);

  const handleDeleteShelter = async (id) => {
    try {
      await TutorialDataService.delete(id);
      setShelters(shelters.filter((shelter) => shelter._id !== id));
    } catch (error) {
      console.error("Error deleting shelter:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="shelters-container">
          {shelters.map((shelter) => (
            <div key={shelter._id} className="card">
              <p className="shelter-name">
                <strong>Name:</strong>
                {shelter.name}
              </p>
              <p className="shelter-info">
                <strong>Location:</strong> {shelter.location}
              </p>
              <p className="shelter-info">
                <strong>Capacity:</strong> {shelter.capacity}
              </p>
              <div className="icon-buttons">
                <Link to={`/shelter/update/${shelter._id}`}>
                  <MdEdit className="edit-icon" />
                </Link>
                <MdDelete
                  className="delete-icon"
                  onClick={() => handleDeleteShelter(shelter._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetShelters;
