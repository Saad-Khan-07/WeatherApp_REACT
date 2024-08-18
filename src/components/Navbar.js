import React from "react";
const api = "fa312aeee55449e79c0111208242306";

var data;
export default function Navbar(props) {
  const InputChange = (e) => {
    props.setSearchValue(e.target.value);
    props.setSearchPressed(false);
  };
  const searchPressed = (e) => {
    e.preventDefault(); //if you dont put this then it will trigger a page reload
    console.log(props.SearchValue);
    props.setSearchPressed(true);
    data = fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${props.SearchValue}&aqi=no&days=6`
    )
      .then((res) => res.json())
      .then((result) => {
        props.setdata(result);
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            InstaCast
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Location"
                aria-label="Search"
                onChange={InputChange}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={searchPressed}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
