import React from 'react';
import AnalysisResults from './components/AnalysisResults';
import OrganizationSuggestions from './components/OrganizationSuggestions';
import './App.css';

// Import the Pakistan test data
import pakistanData from './test-data/pakistan_result.json';

function TestResults() {
  const mockResults = {
    country: pakistanData.country,
    narrative: `# Pakistan Country Analysis - February 7, 2026

## Executive Summary

Pakistan faces moderate challenges across multiple dimensions, with an overall score of 48/100. The geopolitical situation remains tense following recent security incidents, while the economy shows signs of cautious optimism. Social and humanitarian dimensions require focused intervention.

## 1. Geopolitical Situation (Score: 38/100)

**Brief Context**: Pakistan's geopolitical landscape is marked by regional security challenges and diplomatic efforts to strengthen ties with neighboring countries. Recent terrorist attacks have heightened security concerns.

**Recent Developments:**
- **Pakistan, Jordan move toward PTA and wider economic ties**: Talks cover preferential trade and cooperation across multiple sectors.
- **Pakistan signals stronger ties with Iran after blast**: Islamabad reiterates commitment to deepen relations with Tehran.
- **IS claims Islamabad imambargah bombing**: At least 31 killed and 170+ injured; fears of further urban attacks.
- **India rejects allegations of involvement**: New Delhi condemns attack, calls claims baseless.
- **Cross-border militancy spotlighted**: Analysts warn of sectarian risk and Afghan-linked networks.

**Score Justification**: The recent terrorist attack and ongoing regional tensions significantly impact stability, though diplomatic efforts show some positive momentum.

## 2. Economy (Score: 52/100)

**Brief Context**: Pakistan's economy demonstrates mixed signals, with positive developments in foreign investment and remittances offset by market volatility.

**Recent Developments:**
- **PSX down nearly 2% on heavy selling**: Risk-off trading hits index heavyweights.
- **US EXIM okays $1.3bn for Reko Diq**: Financing supports critical minerals supply chains.
- **SBP ups FY26 remittance projection to $42bn**: Seasonal Eid inflows and payments integration cited.
- **Gallup: Public optimism improved vs 2024**: Living standards and economic sentiment tick up.
- **Gold price per tola drops sharply**: Local bullion tracks steep global decline.

**Score Justification**: Positive indicators in foreign investment and remittances provide hope, but market volatility and public sentiment remain concerns.

## 3. Social Issues (Score: 48/100)

**Brief Context**: Social dimensions reveal ongoing challenges in civil liberties and education reform, with some positive cultural developments.

**Recent Developments:**
- **Punjab begins college privatisation**: 71 associate colleges to be transferred by March.
- **Imaan Mazari appeals 17-year conviction**: Petition challenges verdict over social media posts.
- **ATC denies Imran Khan personal doctors**: Court cites jail rules for ongoing treatment.
- **Pakistan showcases interfaith dialogue in DC**: Meetings stress inclusion and youth resilience.
- **Basant revival under strict safety rules**: QR-coded kites, string bans, penalties announced.

**Score Justification**: Civil liberty concerns and education system challenges offset positive cultural and interfaith initiatives.

## 4. Ecological Situation (Score: 62/100)

**Brief Context**: Pakistan shows moderate ecological management with proactive climate policy planning and weather monitoring systems.

**Recent Developments:**
- **Govt seeks pro-climate FY27 budget proposals**: Trade pressures, climate finance steer policy design.
- **NDMA warns of isolated rain/snow north**: Cold/dry elsewhere per Feb 5–10 advisory.
- **PMD: Karachi to see stronger sea breeze**: Dry days and slight temperature uptick expected.
- **PMD: Pleasant Basant weather for Lahore**: Dry, partly cloudy; PDMA shares safety guidance.
- **Cold, dry conditions nationwide**: Major-city temperatures remain low in mornings.

**Score Justification**: Active weather monitoring and climate policy initiatives demonstrate good environmental governance.

## 5. Humanitarian Situation (Score: 40/100)

**Brief Context**: The humanitarian situation faces significant challenges due to security incidents and ongoing health campaigns.

**Recent Developments:**
- **Nationwide polio drive underway**: Millions of children targeted with security for teams.
- **Islamabad blast death toll climbs; funerals held**: Hospitals report rising casualties; security pledges.
- **Arrests of suspected facilitators in KP raids**: One police officer martyred during operations.

**Score Justification**: The recent terrorist attack and its aftermath create immediate humanitarian needs, though health initiatives continue.

## 6. Fun Facts

**Recent Developments:**
- **Basant returns to Lahore**: Rooftop kite-flying and illuminated streets.
- **Good festival weather forecast**: PMD predicts dry, pleasant conditions.
- **Pakistan wins T20 World Cup opener**: Three-wicket thriller delights fans.

## Overall Assessment

Pakistan's overall score of 48/100 indicates a country facing moderate challenges across multiple dimensions. Priority areas for intervention include:

1. **Security and Humanitarian Response**: Immediate needs following recent attacks
2. **Civil Liberties and Social Development**: Addressing freedom of expression and education access
3. **Economic Stabilization**: Supporting market confidence and sustainable growth

The weather analogy for Pakistan's current situation: **"Partly cloudy with scattered storms and uncertain conditions ahead."**`,
    data: pakistanData,
    suggestions: {
      organizations: [
        {
          name: 'Edhi Foundation',
          impact_score: 92,
          focus: 'Emergency humanitarian relief, healthcare, and social services across Pakistan',
          presence: 'Local (National)',
          recent_activities: 'Operating 24/7 ambulance services, providing relief to blast victims, running orphanages and shelters nationwide',
          website: 'https://edhi.org',
          how_to_support: 'https://edhi.org/donate',
          relevance: 'Largest and most trusted humanitarian organization in Pakistan'
        },
        {
          name: 'The Citizens Foundation (TCF)',
          impact_score: 88,
          focus: 'Education access for underprivileged children across Pakistan',
          presence: 'Local (National)',
          recent_activities: 'Operating 1,800+ schools serving 266,000+ students, expanding to rural areas',
          website: 'https://www.tcf.org.pk',
          how_to_support: 'https://www.tcf.org.pk/donate',
          relevance: 'Leading education provider addressing social dimension needs'
        },
        {
          name: 'UNICEF Pakistan',
          impact_score: 85,
          focus: "Children's rights, health, education, and humanitarian response",
          presence: 'International',
          recent_activities: 'Supporting nationwide polio vaccination drive, providing emergency relief after Islamabad attack',
          website: 'https://www.unicef.org/pakistan',
          how_to_support: 'https://www.unicef.org/pakistan/donate',
          relevance: 'Critical for humanitarian and child welfare initiatives'
        },
        {
          name: 'Akhuwat Foundation',
          impact_score: 83,
          focus: 'Interest-free microfinance and poverty alleviation',
          presence: 'Local (National)',
          recent_activities: 'Disbursed over $1 billion in interest-free loans, supporting 5 million families',
          website: 'https://akhuwat.org.pk',
          how_to_support: 'https://akhuwat.org.pk/donate',
          relevance: 'Addresses economic challenges through innovative microfinance'
        },
        {
          name: 'Saylani Welfare International Trust',
          impact_score: 80,
          focus: 'Food security, healthcare, education, and emergency relief',
          presence: 'Local (National)',
          recent_activities: 'Feeding 60,000+ people daily, operating free medical services, running IT training centers',
          website: 'https://saylaniwelfare.com',
          how_to_support: 'https://saylaniwelfare.com/donate',
          relevance: 'Comprehensive welfare services addressing multiple humanitarian needs'
        }
      ],
      priority_areas: ['Humanitarian Aid', 'Education & Social Development', 'Economic Development'],
      source: 'Test Data'
    },
    timestamp: '2026-02-07T12:00:00.000Z'
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🌍 Country Impact Analyst - Test View</h1>
          <p className="subtitle">
            Testing Pakistan Analysis Results
          </p>
        </div>
      </header>

      <main className="App-main">
        <AnalysisResults results={mockResults} onClose={() => window.location.reload()} />
        <OrganizationSuggestions suggestions={mockResults.suggestions} country={mockResults.country} />
      </main>

      <footer className="App-footer">
        <p>Test Data - Pakistan Analysis</p>
      </footer>
    </div>
  );
}

export default TestResults;

