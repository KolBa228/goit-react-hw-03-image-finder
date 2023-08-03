import React from "react";
import "./style.css";

export const Button = ({ onSearchMore }) => {
  return <button className="btn" type="button" onClick={onSearchMore}>Load More</button>;
};