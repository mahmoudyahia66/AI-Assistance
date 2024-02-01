import React from 'react'
import {  Link } from "react-router-dom";

import "./btns.css";
 
function Btns() {
  return (
    <> 
    <Link to="/chat" className="button primary-button">AI Assistance</Link>
    <Link to="/weather" className="button secondary-button">Climate Assistance</Link>
    </>
  )
}

export default Btns