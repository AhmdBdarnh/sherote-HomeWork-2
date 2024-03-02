import { useState } from "react";
import TutorialDataService from "../Service";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "../style.css";

const AddShelter = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();

  const handleUpdateShelter = async () => {
    try {
      const data = { name, location, capacity };
      if (name && location && capacity) {
        await TutorialDataService.create(data);
        navigate("/");
      } else {
        console.log("Fill all the buttons!");
        alert("Fill all the buttons!");
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
            <input type="submit" value="Create Shelter" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddShelter;
