import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AnalysisResults.css';
import ScoreChart from './ScoreChart';

const AnalysisResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState('narrative');

  const getScoreColor = (score) => {
    if (score >= 70) return '#10b981';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Critical';
  };

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h2>Analysis Results: {results.country}</h2>
        {results.data && (
          <div className="overall-score">
            <div className="score-label">Overall Score</div>
            <div 
              className="score-value"
              style={{ color: getScoreColor(results.data.overall_score) }}
            >
              {results.data.overall_score}/100
            </div>
            <div className="score-status">
              {getScoreLabel(results.data.overall_score)}
            </div>
            {results.data.weather_analogy && (
              <div className="weather-analogy">
                <span className="weather-icon">🌤️</span>
                <span className="weather-text">{results.data.weather_analogy}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {results.data && (
        <div className="score-visualization">
          <ScoreChart data={results.data} />
        </div>
      )}

      <div className="results-tabs">
        <button
          className={`tab-button ${activeTab === 'narrative' ? 'active' : ''}`}
          onClick={() => setActiveTab('narrative')}
        >
          📊 Narrative Analysis
        </button>
        <button
          className={`tab-button ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          📋 JSON Data
        </button>
      </div>

      <div className="results-content">
        {activeTab === 'narrative' && (
          <div className="narrative-section">
            <ReactMarkdown>{results.narrative}</ReactMarkdown>
          </div>
        )}

        {activeTab === 'json' && (
          <div className="json-section">
            <pre>{JSON.stringify(results.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;

