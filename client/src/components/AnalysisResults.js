import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AnalysisResults.css';

const AnalysisResults = ({ results, onClose }) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  // Helper function to get country flag emoji
  const getCountryFlag = (countryName) => {
    const countryFlags = {
      'Pakistan': '🇵🇰',
      'Afghanistan': '🇦🇫',
      'India': '🇮🇳',
      'Bangladesh': '🇧🇩',
      'Nepal': '🇳🇵',
      'Sri Lanka': '🇱🇰',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'North Korea': '🇰🇵',
      'Thailand': '🇹🇭',
      'Vietnam': '🇻🇳',
      'Indonesia': '🇮🇩',
      'Philippines': '🇵🇭',
      'Malaysia': '🇲🇾',
      'Singapore': '🇸🇬',
      'Myanmar': '🇲🇲',
      'Cambodia': '🇰🇭',
      'Laos': '🇱🇦',
      'United States': '🇺🇸',
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'Mexico': '🇲🇽',
      'Brazil': '🇧🇷',
      'Argentina': '🇦🇷',
      'Chile': '🇨🇱',
      'Colombia': '🇨🇴',
      'Peru': '🇵🇪',
      'Venezuela': '🇻🇪',
      'Ecuador': '🇪🇨',
      'United Kingdom': '🇬🇧',
      'UK': '🇬🇧',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Portugal': '🇵🇹',
      'Netherlands': '🇳🇱',
      'Belgium': '🇧🇪',
      'Switzerland': '🇨🇭',
      'Austria': '🇦🇹',
      'Sweden': '🇸🇪',
      'Norway': '🇳🇴',
      'Denmark': '🇩🇰',
      'Finland': '🇫🇮',
      'Poland': '🇵🇱',
      'Ukraine': '🇺🇦',
      'Russia': '🇷🇺',
      'Turkey': '🇹🇷',
      'Greece': '🇬🇷',
      'Romania': '🇷🇴',
      'Czech Republic': '🇨🇿',
      'Hungary': '🇭🇺',
      'Egypt': '🇪🇬',
      'South Africa': '🇿🇦',
      'Nigeria': '🇳🇬',
      'Kenya': '🇰🇪',
      'Ethiopia': '🇪🇹',
      'Ghana': '🇬🇭',
      'Tanzania': '🇹🇿',
      'Uganda': '🇺🇬',
      'Morocco': '🇲🇦',
      'Algeria': '🇩🇿',
      'Tunisia': '🇹🇳',
      'Libya': '🇱🇾',
      'Sudan': '🇸🇩',
      'Somalia': '🇸🇴',
      'Yemen': '🇾🇪',
      'Syria': '🇸🇾',
      'Iraq': '🇮🇶',
      'Iran': '🇮🇷',
      'Saudi Arabia': '🇸🇦',
      'UAE': '🇦🇪',
      'United Arab Emirates': '🇦🇪',
      'Kuwait': '🇰🇼',
      'Qatar': '🇶🇦',
      'Bahrain': '🇧🇭',
      'Oman': '🇴🇲',
      'Jordan': '🇯🇴',
      'Lebanon': '🇱🇧',
      'Israel': '🇮🇱',
      'Palestine': '🇵🇸',
      'Haiti': '🇭🇹',
      'Cuba': '🇨🇺',
      'Jamaica': '🇯🇲',
      'Australia': '🇦🇺',
      'New Zealand': '🇳🇿'
    };
    
    return countryFlags[countryName] || '🌍';
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

  // Get gradient position for risk tracker
  const getRiskTrackerGradient = (score) => {
    return `${score}%`;
  };

  // Extract highlights from sub_topics
  const getLatestHighlights = (data) => {
    if (!data) return [];
    
    const highlights = [];
    
    // Get 3-4 most important news items across dimensions
    ['geopolitical', 'humanitarian', 'economy', 'social'].forEach(dimension => {
      if (data[dimension]?.sub_topics) {
        Object.values(data[dimension].sub_topics).forEach(topics => {
          if (Array.isArray(topics) && topics.length > 0) {
            highlights.push(...topics.slice(0, 1)); // Take first item from each sub-topic
          }
        });
      }
    });
    
    return highlights.slice(0, 6); // Return top 6 highlights
  };

  const signalsCount = countSignals(results.data);
  const highlights = getLatestHighlights(results.data);

  return (
    <div className="analysis-results-modern">
      {/* Header */}
      <div className="modern-header">
        <div className="header-left">
          <span className="country-flag">{getCountryFlag(results.country)}</span>
          <h1 className="country-name">{results.country}</h1>
        </div>
        <button className="close-button" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* Top Stats */}
      <div className="top-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Signals tracked</div>
            <div className="stat-value">{signalsCount}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-label">Overall score</div>
            <div className="stat-value">{results.data?.overall_score || 0}%</div>
          </div>
        </div>
      </div>

      {/* Risk Tracker */}
      <div className="risk-tracker-section">
        <div className="risk-tracker-header">
          <span className="risk-tracker-label">Risk tracker</span>
          <span className="risk-tracker-score">{results.data?.overall_score || 0}%</span>
        </div>
        <div className="risk-tracker-bar">
          <div 
            className="risk-tracker-fill"
            style={{ width: getRiskTrackerGradient(results.data?.overall_score || 0) }}
          ></div>
        </div>
      </div>

      {/* Weather Analogy */}
      {results.data?.weather_analogy && (
        <div className="weather-analogy-modern">
          <span className="weather-icon-large">🌤️</span>
          <span className="weather-text-modern">{results.data.weather_analogy}</span>
        </div>
      )}

      {/* Category Scores */}
      <div className="category-scores-section">
        <h2 className="section-title">Category scores</h2>
        <div className="category-grid">
          <div className="category-card">
            <span className="category-name">Geopolitical</span>
            <span className="category-score">{results.data?.geopolitical?.score || 0}%</span>
          </div>
          
          <div className="category-card">
            <span className="category-name">Economy</span>
            <span className="category-score">{results.data?.economy?.score || 0}%</span>
          </div>
          
          <div className="category-card">
            <span className="category-name">Social</span>
            <span className="category-score">{results.data?.social?.score || 0}%</span>
          </div>
          
          <div className="category-card">
            <span className="category-name">Ecological</span>
            <span className="category-score">{results.data?.ecological?.score || 0}%</span>
          </div>
          
          <div className="category-card">
            <span className="category-name">Humanitarian</span>
            <span className="category-score">{results.data?.humanitarian?.score || 0}%</span>
          </div>
          
          <div className="category-card">
            <span className="category-name">Fun facts</span>
            <span className="category-score">-</span>
          </div>
        </div>
      </div>

      {/* Latest Highlights */}
      <div className="highlights-section">
        <h2 className="section-title">Latest highlights</h2>
        <div className="highlights-list">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-item">
              <h3 className="highlight-headline">{item.headline}</h3>
              <p className="highlight-summary">{item.brief_summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* View Full Analysis Button */}
      <div className="actions-section">
        <button 
          className="full-analysis-btn"
          onClick={() => setShowFullAnalysis(!showFullAnalysis)}
        >
          {showFullAnalysis ? '📊 Hide Full Analysis' : '📊 View Full Analysis'}
        </button>
      </div>

      {/* Full Analysis (Collapsible) */}
      {showFullAnalysis && (
        <div className="full-analysis-section">
          <div className="narrative-section-modern">
            <h3>Detailed Analysis</h3>
            <ReactMarkdown>{results.narrative}</ReactMarkdown>
          </div>
          
          <div className="json-section-modern">
            <h3>JSON Data</h3>
            <pre>{JSON.stringify(results.data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
