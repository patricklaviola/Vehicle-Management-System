import React from "react";
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button 
          className="navbar-toggler" 
          type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap">

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Games
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/tic-tac-toe/" style={{ color: "black" }}>Tic-tac-toe</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Manufacturers
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/manufacturers/" style={{ color: "black" }}>Manufacturers</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/manufacturers/new/" style={{ color: "black" }}>Add Manufacturer</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Models
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/models/" style={{ color: "black" }}>Models</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/models/new/" style={{ color: "black" }}>Create a Model</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Automobiles
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/automobiles/" style={{ color: "black" }}>Automobiles</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/automobiles/new/" style={{ color: "black" }}>Create a Automobile</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Salespeople
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/salespeople/" style={{ color: "black" }}>Salespeople</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/salespeople/new/" style={{ color: "black" }}>Add a Salesperson</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Customers
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/customers/" style={{ color: "black" }}>Customers</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/customers/new/" style={{ color: "black" }}>Add a Customer</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Sales
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/sales/" style={{ color: "black" }}>Sales</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/sales/new" style={{ color: "black" }}>Add a Sale</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/sales/history/" style={{ color: "black" }}>Salesperson History</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Technicians
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/technicians/" style={{ color: "black" }}>Technicians</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/technicians/new/" style={{ color: "black" }}>Add a Technician</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
								style={{
									backgroundColor: "transparent",
									border: "none",
									color: "rgba(255,255,255,.55)",
									transition: "color 0.2s",
								}}
								onMouseEnter={(e) => {
									e.target.style.color = "white";
								}}
								onMouseLeave={(e) => {
									e.target.style.color =
										"rgba(255, 255, 255, 0.55)";
								}}
              >
                Appointments
              </button>
              <ul className = "dropdown-menu">
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/appointments/" style={{ color: "black" }}>Service Appointments</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/appointments/new/" style={{ color: "black" }}>Create a Service Appointment</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink className="nav-link" aria-current="page" to="/appointments/history/" style={{ color: "black" }}>Service History</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

