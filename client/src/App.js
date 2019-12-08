import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App_Aside"></div>
      <div className="App_Form">
        <div className="PageSwitcher">
          <a href="#" className="PageSwitcher_Item">
            Sign In
          </a>
          <a href="#" className="PageSwitcher_Item PageSwitcher_Item--Active">
            Sign Up
          </a>
        </div>
        <div className="FormTitle">
          <a href="#" className="FormTitle_Link">
            Sign In
          </a>
          or
          <a href="#" className="FormTitle_Link FormTitle_Link--Active">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
