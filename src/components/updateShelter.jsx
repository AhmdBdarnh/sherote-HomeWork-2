import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TutorialDataService from "../Service";
import Header from "./header";
import "../style.css";

const UpdateShelter = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();

  const handleUpdateShelter = async () => {
    try {
      const data = { name, location, capacity };
      if (name && location && capacity) {
        await TutorialDataService.update(id, data);
        navigate("/");
      } else {
        console.log("Fill all the fields!");
        alert("Fill all the fields!");
      }
    } catch (error) {
      console.error("Error updating shelter:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateShelter();
  };

  return (
    <>
      <Header />
      <div className="containerr">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Shelter name"
            />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Shelter Location"
            />
            <input
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter Shelter Capacity"
            />
            <input type="submit" value="Update Shelter" />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateShelter;
