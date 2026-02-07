import React, { useState } from 'react';
import './CountryInput.css';

const CountryInput = ({ onAnalyze, loading }) => {
  const [country, setCountry] = useState('');
  const [cause, setCause] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country.trim()) {
      onAnalyze(country.trim(), cause.trim());
    }
  };

  return (
    <div className="country-input-container">
      <div className="input-card">
        <h2>Analyze a Country</h2>
        <p className="input-description">
          Enter a country name to receive a comprehensive humanitarian impact assessment
          based on the latest news and developments from the last 3 days.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country name (e.g., Ukraine, Haiti, Yemen)"
              disabled={loading}
              className="country-input"
              required
            />
            <button 
              type="submit" 
              disabled={loading || !country.trim()}
              className="analyze-button"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          
          <div className="cause-wrapper">
            <label htmlFor="cause-input" className="cause-label">
              Optional: Specific Cause or Issue
            </label>
            <input
              id="cause-input"
              type="text"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              placeholder="e.g., gender equality, education, climate change, LGBTQ+ rights"
              disabled={loading}
              className="cause-input"
            />
            <p className="cause-hint">
              Leave blank for general analysis, or specify a cause to focus the investigation
            </p>
          </div>
        </form>

        <div className="quick-examples">
          <span className="examples-label">Quick examples:</span>
          <button 
            onClick={() => setCountry('Ukraine')} 
            disabled={loading}
            className="example-btn"
          >
            Ukraine
          </button>
          <button 
            onClick={() => setCountry('Haiti')} 
            disabled={loading}
            className="example-btn"
          >
            Haiti
          </button>
          <button 
            onClick={() => setCountry('Yemen')} 
            disabled={loading}
            className="example-btn"
          >
            Yemen
          </button>
          <button 
            onClick={() => setCountry('Somalia')} 
            disabled={loading}
            className="example-btn"
          >
            Somalia
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryInput;

