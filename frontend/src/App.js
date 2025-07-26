import React, { useState } from "react";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Predict from "./components/Predict";
import About from "./components/About";
import History from "./components/History";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [section, setSection] = useState("home");
  const [predictKey, setPredictKey] = useState(0); // force re-render Predict

  const handleNewUpload = () => {
    setPredictKey(prev => prev + 1); // refresh Predict component
    setSection("predict");
  };

  const renderSection = () => {
    switch (section) {
      case "predict":
        return <Predict key={predictKey} />;
      case "about":
        return <About />;
      case "history":
        return <History />;
      default:
        return <Home showSection={setSection} />;
    }
  };

  return (
    <div>
      <header className="bg-success text-white text-center py-3">
        <h1>Plant Disease Tracker</h1>
      </header>

      <Navbar setSection={setSection} />

      <div className="container mt-4">
        {renderSection()}
      </div>

      {/* Show button only when in Predict page */}
      {section === "predict" && (
        <div className="text-center mt-4 mb-2">
          <button className="btn btn-outline-success" onClick={handleNewUpload}>
            New Upload
          </button>
        </div>
      )}

      <footer className="mt-5 p-3 bg-dark text-white text-center">
        &copy; 2025 Plant Disease Tracker
      </footer>
    </div>
  );
}

export default App;
