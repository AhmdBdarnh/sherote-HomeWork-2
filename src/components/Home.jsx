import Header from "../components/header";
import { Link } from "react-router-dom";
import "../style.css";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="home-main">
        <Link to="/shelters">
          <button>getAllShelters</button>
        </Link>
        <Link to="/shelter/">
          <button>getShelterById</button>
        </Link>
        <Link to="/Addshelter">
          <button>addShelter</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
