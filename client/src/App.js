import React, { useState } from 'react';
import './App.css';
import CountryInput from './components/CountryInput';
import AnalysisResults from './components/AnalysisResults';
import OrganizationSuggestions from './components/OrganizationSuggestions';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (country, cause = '') => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const payload = { country };
      if (cause && cause.trim()) {
        payload.cause = cause.trim();
      }
      const response = await axios.post('/api/analyze', payload);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze country. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🌍 Country Impact Analyst</h1>
          <p className="subtitle">
            AI-powered humanitarian impact assessment and geopolitical risk evaluation
          </p>
        </div>
      </header>

      <main className="App-main">
        <CountryInput onAnalyze={handleAnalyze} loading={loading} />
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>🌐 Browsing the web for recent news and analyzing...</p>
            <p className="loading-subtext">Searching news from the last 3 days • This may take 30-60 seconds</p>
          </div>
        )}

        {results && !loading && (
          <>
            <AnalysisResults results={results} />
            <OrganizationSuggestions suggestions={results.suggestions} country={results.country} />
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>
          Built for philanthropists, NGO strategists, and social impact investors
        </p>
        <p className="footer-note">
          Data based on recent news and AI analysis • Always verify with local sources
        </p>
      </footer>
    </div>
  );
}

export default App;

