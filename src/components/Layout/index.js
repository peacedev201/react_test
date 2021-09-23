import { Link } from "react-router-dom";

import logo from "./logo.png";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="body">
      <header className="header">
        <Link to="/">
          <img src={logo} className="header-logo" alt="logo" />
        </Link>
        <h2>PSNGR1 tech test</h2>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
