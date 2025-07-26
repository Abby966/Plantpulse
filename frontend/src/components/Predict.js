import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Predict = () => {
  const { t, i18n } = useTranslation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const changeLang = (e) => i18n.changeLanguage(e.target.value);

  // Delete all history (temporary as requested)
  useEffect(() => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
  }, []);

  // Clean history older than 30 days
  const cleanOldHistory = () => {
    const existing = JSON.parse(localStorage.getItem("scanHistory")) || [];
    const now = new Date();
    const filtered = existing.filter(item => {
      const itemDate = new Date(item.date);
      const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
      return diffDays <= 30;
    });
    localStorage.setItem("scanHistory", JSON.stringify(filtered));
    setHistory(filtered);
  };

  useEffect(() => {
    cleanOldHistory();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) await handlePredict(file);
  };

  const handlePredict = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);

      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        saveToHistory(reader.result, data, "upload");
        setHistory(JSON.parse(localStorage.getItem("scanHistory")) || []);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setResult(null); // Don't show "prediction failed"
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (image, result, method) => {
    const newItem = {
      date: new Date().toISOString(),
      image,
      result,
      method,
    };
    const existing = JSON.parse(localStorage.getItem("scanHistory")) || [];
    localStorage.setItem("scanHistory", JSON.stringify([...existing, newItem]));
  };

  return (
    <div className="text-center text-light bg-dark p-4 rounded">
      <div className="d-flex justify-content-between mb-3">
        <h2>{t('welcome')}</h2>
        <select onChange={changeLang} className="form-select w-auto">
          <option value="en">English</option>
          <option value="am">አማርኛ</option>
          <option value="om">Afaan Oromoo</option>
          <option value="ti">ትግርኛ</option>
        </select>
      </div>

      <input type="file" accept="image/*" onChange={handleFileChange} ref={inputRef} className="form-control my-3" />
      {loading && <p className="text-warning">{t('analyzing')}</p>}

      {result && (
        <div className="bg-success text-white p-3 rounded mb-4">
          <h4>✅ {t('result')}</h4>
          <p><strong>{t('disease')}:</strong> {result.disease}</p>
          <p><strong>{t('confidence')}:</strong> {(result.confidence * 100).toFixed(2)}%</p>
          <p><strong>{t('tips')}:</strong> {result.tips}</p>

          {result.disease !== "Healthy" && (
            <>
              <hr />
              <h5>🌾 {t('stage')}</h5>
              <p><strong>{t('stage')}:</strong> Mid vegetative stage</p>
              <p><strong>{t('deficiency')}:</strong> Nitrogen</p>
              <p><strong>{t('need')}:</strong> Fungicide & nutrients</p>
              <p><strong>{t('next')}:</strong> Monitor weekly</p>
            </>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-light text-dark p-3 rounded mb-5">
          <h5 className="mb-3">🕘 Scan History (Last 30 Days)</h5>
          <div className="row">
            {history.map((item, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="border rounded p-2 bg-white shadow-sm">
                  <img src={item.image} alt="Scan" className="img-fluid rounded" />
                  <p className="mt-2"><strong>Disease:</strong> {item.result.disease}</p>
                  <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                  <p><strong>Method:</strong> {item.method}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Predict;
