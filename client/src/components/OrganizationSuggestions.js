import React from 'react';
import './OrganizationSuggestions.css';

const OrganizationSuggestions = ({ suggestions, country }) => {
  if (!suggestions || !suggestions.organizations || suggestions.organizations.length === 0) {
    return null;
  }

  const getImpactColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getImpactLabel = (score) => {
    if (score >= 80) return 'Very High Impact';
    if (score >= 60) return 'High Impact';
    if (score >= 40) return 'Moderate Impact';
    return 'Growing Impact';
  };

  return (
    <div className="organization-suggestions">
      <div className="suggestions-header">
        <h2>Recommended Organizations for {country}</h2>
        <p className="suggestions-description">
          Based on web research and analysis, these organizations are actively working in {country} 
          and well-positioned to create meaningful impact.
          {suggestions.source && suggestions.source === 'AI Web Search' && (
            <span className="source-badge">✓ Web-Verified</span>
          )}
        </p>
      </div>

      {suggestions.priority_areas && suggestions.priority_areas.length > 0 && (
        <div className="priority-areas">
          <h3>Priority Areas for Intervention:</h3>
          <div className="priority-tags">
            {suggestions.priority_areas.map((area, index) => (
              <span key={index} className="priority-tag">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="organizations-grid">
        {suggestions.organizations.map((org, index) => (
          <div key={index} className="organization-card">
            <div className="org-header">
              <div className="org-title-section">
                <h3>{org.name}</h3>
                {org.impact_score !== undefined && (
                  <div className="impact-score-badge">
                    <div 
                      className="impact-score"
                      style={{ color: getImpactColor(org.impact_score) }}
                    >
                      {org.impact_score}/100
                    </div>
                    <div className="impact-label">{getImpactLabel(org.impact_score)}</div>
                  </div>
                )}
              </div>
              {org.presence && (
                <span className="presence-badge">{org.presence}</span>
              )}
            </div>

            {org.focus && (
              <div className="org-focus">
                <strong>Focus Area:</strong> {org.focus}
              </div>
            )}

            {org.recent_activities && (
              <div className="org-activities">
                <strong>Recent Activities:</strong>
                <p>{org.recent_activities}</p>
              </div>
            )}

            {org.relevance && !org.recent_activities && (
              <div className="org-relevance">
                <strong>Why This Matters:</strong>
                <p>{org.relevance}</p>
              </div>
            )}

            <div className="org-actions">
              {org.website && (
                <a 
                  href={org.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="org-button org-website-btn"
                >
                  Visit Website
                </a>
              )}
              {org.how_to_support && (
                <a 
                  href={org.how_to_support.includes('http') ? org.how_to_support : org.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="org-button org-donate-btn"
                >
                  Support This Organization
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="disclaimer">
        <p>
          <strong>Note:</strong> These recommendations are based on AI analysis of recent developments.
          Please conduct your own due diligence and research before making donation decisions.
          Consider verifying organizations through platforms like{' '}
          <a href="https://www.charitynavigator.org" target="_blank" rel="noopener noreferrer">
            Charity Navigator
          </a>,{' '}
          <a href="https://www.guidestar.org" target="_blank" rel="noopener noreferrer">
            GuideStar
          </a>, or{' '}
          <a href="https://www.givewell.org" target="_blank" rel="noopener noreferrer">
            GiveWell
          </a>.
        </p>
      </div>
    </div>
  );
};

export default OrganizationSuggestions;

