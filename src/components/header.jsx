import { Link } from "react-router-dom";
import "../style.css"; 
import logo from "../../public/shelter-logo.png"; 
import { MdHome } from 'react-icons/md';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-logo-link">
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>
        <h1>Welecome to Sheleter APP</h1>
      <Link to="/" className="header-icon-link">
        <button className="home-button"><MdHome /></button>
      </Link>
    </header>
  );
};

export default Header;
