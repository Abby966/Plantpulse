import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("predictionHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h2 className="mb-4">Prediction History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="row">
          {history.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt="Scanned" />
                <div className="card-body">
                  <h5 className="card-title">{item.result}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {item.date}<br />
                    <strong>Method:</strong> {item.method}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
