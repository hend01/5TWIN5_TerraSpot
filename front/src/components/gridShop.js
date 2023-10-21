import React from "react";
import { Link } from "react-router-dom";


const gridShop = (props) => {
  const { data } = props;

  const pageHeaderStyle = {
    backgroundImage: 'url("assets/images/page-header-bg.jpg")',
  };

  return (
    <div>
      <div className="page-header text-center" style={pageHeaderStyle}>
        <div className="container">
          <h1 className="page-title">
          {data.header}<span>TerraSport</span>
          </h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
            <Link to={data.url}>{data.name}</Link>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
};

export default gridShop;
