import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AnalysisResults.css';

const AnalysisResults = ({ results, onClose }) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  // Get country code for flag API
  const getCountryCode = (countryName) => {
    const countryCodes = {
      'Pakistan': 'PK', 'Afghanistan': 'AF', 'India': 'IN', 'Bangladesh': 'BD',
      'Nepal': 'NP', 'Sri Lanka': 'LK', 'China': 'CN', 'Japan': 'JP',
      'South Korea': 'KR', 'North Korea': 'KP', 'Thailand': 'TH', 'Vietnam': 'VN',
      'Indonesia': 'ID', 'Philippines': 'PH', 'Malaysia': 'MY', 'Singapore': 'SG',
      'Myanmar': 'MM', 'Cambodia': 'KH', 'Laos': 'LA', 'United States': 'US',
      'USA': 'US', 'Canada': 'CA', 'Mexico': 'MX', 'Brazil': 'BR',
      'Argentina': 'AR', 'Chile': 'CL', 'Colombia': 'CO', 'Peru': 'PE',
      'Venezuela': 'VE', 'Ecuador': 'EC', 'United Kingdom': 'GB', 'UK': 'GB',
      'France': 'FR', 'Germany': 'DE', 'Italy': 'IT', 'Spain': 'ES',
      'Portugal': 'PT', 'Netherlands': 'NL', 'Belgium': 'BE', 'Switzerland': 'CH',
      'Austria': 'AT', 'Sweden': 'SE', 'Norway': 'NO', 'Denmark': 'DK',
      'Finland': 'FI', 'Poland': 'PL', 'Ukraine': 'UA', 'Russia': 'RU',
      'Turkey': 'TR', 'Greece': 'GR', 'Romania': 'RO', 'Czech Republic': 'CZ',
      'Hungary': 'HU', 'Egypt': 'EG', 'South Africa': 'ZA', 'Nigeria': 'NG',
      'Kenya': 'KE', 'Ethiopia': 'ET', 'Ghana': 'GH', 'Tanzania': 'TZ',
      'Uganda': 'UG', 'Morocco': 'MA', 'Algeria': 'DZ', 'Tunisia': 'TN',
      'Libya': 'LY', 'Sudan': 'SD', 'Somalia': 'SO', 'Yemen': 'YE',
      'Syria': 'SY', 'Iraq': 'IQ', 'Iran': 'IR', 'Saudi Arabia': 'SA',
      'UAE': 'AE', 'United Arab Emirates': 'AE', 'Kuwait': 'KW', 'Qatar': 'QA',
      'Bahrain': 'BH', 'Oman': 'OM', 'Jordan': 'JO', 'Lebanon': 'LB',
      'Israel': 'IL', 'Palestine': 'PS', 'Haiti': 'HT', 'Cuba': 'CU',
      'Jamaica': 'JM', 'Australia': 'AU', 'New Zealand': 'NZ'
    };
    
    return countryCodes[countryName] || 'UN';
  };

  // Count total signals from all dimensions
  const countSignals = (data) => {
    if (!data) return 0;
    let count = 0;
    
    ['geopolitical', 'economy', 'social', 'ecological', 'humanitarian', 'fun_facts'].forEach(dimension => {
      if (data[dimension]?.sub_topics) {
        Object.values(data[dimension].sub_topics).forEach(topics => {
          if (Array.isArray(topics)) {
            count += topics.length;
          }
        });
      }
    });
    
    return count;
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 70) return '#059669'; // Green
    if (score >= 40) return '#d97706'; // Amber
    return '#dc2626'; // Red
  };

  // Get score label
  const getScoreLabel = (score) => {
    if (score >= 70) return 'Favorable';
    if (score >= 40) return 'Moderate';
    return 'Critical';
  };

  // Extract highlights from sub_topics
  const getLatestHighlights = (data) => {
    if (!data) return [];
    
    const highlights = [];
    
    ['geopolitical', 'humanitarian', 'economy', 'social'].forEach(dimension => {
      if (data[dimension]?.sub_topics) {
        Object.values(data[dimension].sub_topics).forEach(topics => {
          if (Array.isArray(topics) && topics.length > 0) {
            highlights.push(...topics.slice(0, 1));
          }
        });
      }
    });
    
    return highlights.slice(0, 6);
  };

  const countryCode = getCountryCode(results.country);
  const signalsCount = countSignals(results.data);
  const highlights = getLatestHighlights(results.data);
  const overallScore = results.data?.overall_score || 0;

  return (
    <div className="nyt-analysis-container">
      {/* Header */}
      <header className="nyt-header">
        <div className="nyt-header-content">
          <div className="nyt-country-section">
            <img 
              src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
              alt={`${results.country} flag`}
              className="nyt-country-flag"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1 className="nyt-country-name">{results.country}</h1>
          </div>
          <button className="nyt-close-btn" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Key Metrics Bar */}
      <div className="nyt-metrics-bar">
        <div className="nyt-metric">
          <span className="nyt-metric-label">Signals Tracked</span>
          <span className="nyt-metric-value">{signalsCount}</span>
        </div>
        <div className="nyt-metric nyt-metric-primary">
          <span className="nyt-metric-label">Overall Assessment</span>
          <span 
            className="nyt-metric-value nyt-score-large" 
            style={{ color: getScoreColor(overallScore) }}
          >
            {overallScore}%
          </span>
        </div>
        <div className="nyt-metric">
          <span className="nyt-metric-label">Status</span>
          <span className="nyt-metric-value">{getScoreLabel(overallScore)}</span>
        </div>
      </div>

      {/* Risk Assessment Bar */}
      <div className="nyt-risk-section">
        <div className="nyt-risk-header">
          <h3 className="nyt-section-title">Risk Assessment</h3>
          <span className="nyt-risk-score">{overallScore}%</span>
        </div>
        <div className="nyt-risk-bar">
          <div 
            className="nyt-risk-fill"
            style={{ 
              width: `${overallScore}%`,
              backgroundColor: getScoreColor(overallScore)
            }}
          >
            <div className="nyt-risk-marker"></div>
          </div>
        </div>
        <div className="nyt-risk-labels">
          <span>Critical</span>
          <span>Moderate</span>
          <span>Favorable</span>
        </div>
      </div>

      {/* Weather Context (if available) */}
      {results.data?.weather_analogy && (
        <div className="nyt-context-box">
          <h3 className="nyt-context-title">Current Outlook</h3>
          <p className="nyt-context-text">{results.data.weather_analogy}</p>
        </div>
      )}

      {/* Dimension Scores */}
      <section className="nyt-dimensions-section">
        <h2 className="nyt-section-title">Assessment by Dimension</h2>
        <div className="nyt-dimensions-grid">
          <div className="nyt-dimension-card">
            <h4 className="nyt-dimension-name">Geopolitical</h4>
            <div 
              className="nyt-dimension-score"
              style={{ color: getScoreColor(results.data?.geopolitical?.score || 0) }}
            >
              {results.data?.geopolitical?.score || 0}
            </div>
          </div>
          
          <div className="nyt-dimension-card">
            <h4 className="nyt-dimension-name">Economic</h4>
            <div 
              className="nyt-dimension-score"
              style={{ color: getScoreColor(results.data?.economy?.score || 0) }}
            >
              {results.data?.economy?.score || 0}
            </div>
          </div>
          
          <div className="nyt-dimension-card">
            <h4 className="nyt-dimension-name">Social</h4>
            <div 
              className="nyt-dimension-score"
              style={{ color: getScoreColor(results.data?.social?.score || 0) }}
            >
              {results.data?.social?.score || 0}
            </div>
          </div>
          
          <div className="nyt-dimension-card">
            <h4 className="nyt-dimension-name">Environmental</h4>
            <div 
              className="nyt-dimension-score"
              style={{ color: getScoreColor(results.data?.ecological?.score || 0) }}
            >
              {results.data?.ecological?.score || 0}
            </div>
          </div>
          
          <div className="nyt-dimension-card">
            <h4 className="nyt-dimension-name">Humanitarian</h4>
            <div 
              className="nyt-dimension-score"
              style={{ color: getScoreColor(results.data?.humanitarian?.score || 0) }}
            >
              {results.data?.humanitarian?.score || 0}
            </div>
          </div>
          
          <div className="nyt-dimension-card nyt-dimension-neutral">
            <h4 className="nyt-dimension-name">Cultural Notes</h4>
            <div className="nyt-dimension-score nyt-dimension-na">N/A</div>
          </div>
        </div>
      </section>

      {/* Key Developments */}
      <section className="nyt-highlights-section">
        <h2 className="nyt-section-title">Key Recent Developments</h2>
        <div className="nyt-highlights-list">
          {highlights.map((item, index) => (
            <article key={index} className="nyt-highlight-item">
              <h3 className="nyt-highlight-headline">{item.headline}</h3>
              <p className="nyt-highlight-summary">{item.brief_summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Full Analysis Toggle */}
      <div className="nyt-analysis-toggle">
        <button 
          className="nyt-toggle-btn"
          onClick={() => setShowFullAnalysis(!showFullAnalysis)}
        >
          {showFullAnalysis ? 'Hide Detailed Analysis' : 'View Detailed Analysis'}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            style={{ 
              transform: showFullAnalysis ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
      </div>

      {/* Full Analysis (Collapsible) */}
      {showFullAnalysis && (
        <div className="nyt-full-analysis">
          <section className="nyt-narrative-section">
            <h2 className="nyt-section-title">Complete Analysis</h2>
            <div className="nyt-narrative-content">
              <ReactMarkdown>{results.narrative}</ReactMarkdown>
            </div>
          </section>
          
          <section className="nyt-data-section">
            <h2 className="nyt-section-title">Structured Data</h2>
            <div className="nyt-json-viewer">
              <pre>{JSON.stringify(results.data, null, 2)}</pre>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
