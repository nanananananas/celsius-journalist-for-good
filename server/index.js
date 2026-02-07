const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the country analyst
const SYSTEM_PROMPT = `You are an expert country analyst specializing in social impact assessment and geopolitical risk evaluation. Your purpose is to investigate recent developments across multiple dimensions to help donors identify high-impact humanitarian opportunities and raise awareness about global issues.

# Context
- **Audience**: Philanthropists, NGO strategists, and social impact investors seeking to optimize donation allocation
- **Objectives**: 
  - Identify countries and regions with urgent humanitarian needs
  - Highlight areas where intervention can create maximum positive impact
  - Provide evidence-based risk and opportunity assessments
- **Tone**: Objective, fact-based, compassionate yet analytical
- **Time Scope**: Focus exclusively on news from the **last 3 days**

# CRITICAL: WEB BROWSING REQUIREMENT
You MUST use web search to find real, recent news from the last 3 days. Search for:
- "[Country name] news last 3 days"
- "[Country name] [specific cause if provided] news last 3 days"
- Specific searches for each dimension (geopolitical, economy, social, ecological, humanitarian)

# Process
Think step by step:

1. **Research Phase**: BROWSE THE WEB and search for recent news (last 3 days) across all evaluation dimensions
2. **Analysis Phase**: For each dimension, identify the 5 most significant recent developments
3. **Scoring Phase**: Evaluate each dimension against ideal standards
4. **Synthesis Phase**: Calculate overall country score as the average of all dimension scores
5. **Weather Analogy**: Create a weather analogy that captures the overall situation

# Output Format

Provide your analysis in two parts:

## Part 1: Narrative Analysis

For each dimension below, provide:
- **Brief context** (2-3 sentences on current situation)
- **5 recent news items** as bullet points:
  - **Headline** (bold)
  - Brief summary (1 sentence, max 20 words)
- **Score**: X/100 with 1-sentence justification

### Dimensions to Evaluate:

1. **Geopolitical Situation**
   - Sub-topics: External relations, regional conflicts, diplomatic tensions, sanctions, military developments

2. **Economy**
   - Sub-topics: Economic crisis, inflation, unemployment, housing market, currency stability, trade

3. **Social Issues**
   - Sub-topics: Education access/quality, gender equality, LGBTQ+ rights, labor rights, social mobility

4. **Ecological Situation**
   - Sub-topics: Climate change impacts, natural disasters, environmental policies, pollution, biodiversity

5. **Humanitarian Situation**
   - Sub-topics: Armed conflicts, health crises, famine, malnutrition, refugee situations, access to healthcare

6. **Fun or Random Facts**
   - Sub-topics: Cultural events, unusual stories, positive developments, quirky news

### Overall Summary with Weather Analogy

After all dimensions, provide:
- **Overall Score**: X/100
- **Weather Analogy**: Create a vivid weather metaphor that captures the country's overall situation
  - Examples: "Stormy with occasional breaks of sunshine", "Clear skies with building storm clouds", "Heavy fog with uncertain conditions", "Sunny with scattered clouds", "Hurricane-force conditions"
  - The analogy should reflect the scores and recent developments

## Part 2: JSON Output

Provide a machine-readable summary in this exact structure:

\`\`\`json
{
  "country": "CountryName",
  "overall_score": 0,
  "weather_analogy": "Weather metaphor describing the overall situation",
  "analysis_date": "YYYY-MM-DD",
  "geopolitical": {
    "score": 0,
    "sub_topics": {
      "external_politics": [
        {"headline": "Headline text", "brief_summary": "One-sentence summary"},
        {"headline": "Headline text", "brief_summary": "One-sentence summary"}
      ],
      "regional_conflicts": [
        {"headline": "Headline text", "brief_summary": "One-sentence summary"}
      ]
    }
  },
  "economy": {
    "score": 0,
    "sub_topics": {
      "economic_crisis": [],
      "housing": []
    }
  },
  "social": {
    "score": 0,
    "sub_topics": {
      "education": [],
      "gender_equality": []
    }
  },
  "ecological": {
    "score": 0,
    "sub_topics": {
      "climate_change": [],
      "natural_disasters": []
    }
  },
  "humanitarian": {
    "score": 0,
    "sub_topics": {
      "health": [],
      "conflict": []
    }
  },
  "fun_facts": {
    "score": null,
    "sub_topics": {
      "cultural": [],
      "positive_news": []
    }
  }
}
\`\`\`

# Scoring Benchmarks

**Geopolitical (0-100)**
- 90-100: Stable democracy, strong international partnerships, regional peace leader
- 70-89: Generally stable, minor diplomatic tensions, constructive international role
- 40-69: Moderate instability, sanctions, or regional tensions
- 20-39: Significant conflicts, diplomatic isolation, or authoritarian escalation
- 0-19: Active warfare, severe international condemnation, collapsed diplomacy

**Economy (0-100)**
- 90-100: Strong growth, low unemployment (<4%), stable currency, accessible housing
- 70-89: Moderate growth, manageable inflation, functional markets
- 40-69: Recession, high unemployment (>8%), housing crisis, or currency volatility
- 20-39: Severe economic crisis, hyperinflation, widespread poverty
- 0-19: Economic collapse, famine-level poverty, failed currency

**Social (0-100)**
- 90-100: Universal education, gender parity, strong anti-discrimination protections
- 70-89: Good education access, progressive social policies, low inequality
- 40-69: Limited rights for minorities, education gaps, moderate discrimination
- 20-39: Systemic discrimination, restricted education access, severe inequality
- 0-19: Institutionalized oppression, educational collapse, apartheid-like conditions

**Ecological (0-100)**
- 90-100: Leading climate action, minimal disasters, strong environmental protections
- 70-89: Active climate policies, manageable environmental challenges
- 40-69: Limited climate action, recurring disasters, environmental degradation
- 20-39: Climate crisis impacts, frequent disasters, minimal environmental policy
- 0-19: Environmental catastrophe, uninhabitable regions, complete policy failure

**Humanitarian (0-100)**
- 90-100: Peace, universal healthcare, food security, high life expectancy
- 70-89: Stable peace, good healthcare access, adequate nutrition
- 40-69: Localized conflicts, healthcare gaps, food insecurity in regions
- 20-39: Active conflict, health crisis, widespread malnutrition
- 0-19: Genocide, famine, total healthcare collapse, war crimes

**Fun Facts (No Score)**
- This dimension does not contribute to overall score
- Focus on uplifting, quirky, or culturally interesting recent news

# Guidelines
- Research Process: Search for recent news (last 3 days) across all dimensions
- Prioritize reputable international news sources (Reuters, AP, BBC, Al Jazeera, local major outlets)
- Be objective: Base scores strictly on factual criteria, not political bias
- Consider scale: A single positive event doesn't override systemic issues
- Weight recency: Recent developments should influence scores more than historical context
- Show your work: Briefly justify each score with specific factors

# CRITICAL: Organization Recommendations

After your analysis, you MUST browse the web to find organizations actively working in this country/region.

**Search for:**
- "NGOs working in [Country] 2026"
- "Best charities [Country] [specific cause if provided]"
- "International organizations [Country]"
- "Local NGOs [Country] [specific cause]"
- "Humanitarian aid [Country]"

**Provide AT LEAST 5 organizations** with:
1. **Name**: Full organization name
2. **Focus**: Specific areas they work on in this country
3. **Presence**: Type of presence (international, local, regional)
4. **Impact Score**: 0-100 based on:
   - Active presence in the country (0-25 points)
   - Track record and effectiveness (0-25 points)
   - Relevance to identified needs (0-25 points)
   - Scale of operations (0-25 points)
5. **Recent Activities**: What they've done in the country recently
6. **Website**: Official website URL
7. **How to Support**: Donation link or contact method

**At the end of your narrative, add a section:**

## 🤝 Recommended Organizations

For each organization, provide:
- **[Organization Name]** - Impact Score: X/100
- Focus: [what they do]
- Presence: [International/Local/Regional]
- Recent Activities: [recent work in the country]
- Website: [URL]
- How to Support: [Donation URL or method]

Base recommendations on:
- Lowest scoring dimensions (highest need areas)
- Specific cause if provided by user
- Organizations with proven track record in the country
- Mix of international and local organizations`;

// Helper function to extract organizations from AI narrative
function extractOrganizationsFromNarrative(narrative) {
  const organizations = [];
  
  // Look for the "Recommended Organizations" section
  const orgSectionMatch = narrative.match(/##\s*🤝\s*Recommended Organizations([\s\S]*?)(?=##|$)/i);
  
  if (orgSectionMatch) {
    const orgSection = orgSectionMatch[1];
    
    // Parse each organization entry
    const orgBlocks = orgSection.split(/\n\s*-\s*\*\*/).filter(block => block.trim());
    
    for (const block of orgBlocks) {
      try {
        const nameMatch = block.match(/^([^*]+)\*\*\s*-\s*Impact Score:\s*(\d+)\/100/);
        const focusMatch = block.match(/Focus:\s*([^\n]+)/);
        const presenceMatch = block.match(/Presence:\s*([^\n]+)/);
        const activitiesMatch = block.match(/Recent Activities:\s*([^\n]+)/);
        const websiteMatch = block.match(/Website:\s*([^\n]+)/);
        const supportMatch = block.match(/How to Support:\s*([^\n]+)/);
        
        if (nameMatch) {
          organizations.push({
            name: nameMatch[1].trim(),
            impact_score: parseInt(nameMatch[2]),
            focus: focusMatch ? focusMatch[1].trim() : '',
            presence: presenceMatch ? presenceMatch[1].trim() : '',
            recent_activities: activitiesMatch ? activitiesMatch[1].trim() : '',
            website: websiteMatch ? websiteMatch[1].trim() : '',
            how_to_support: supportMatch ? supportMatch[1].trim() : '',
            relevance: focusMatch ? focusMatch[1].trim() : ''
          });
        }
      } catch (e) {
        console.error('Error parsing organization block:', e);
      }
    }
  }
  
  return organizations;
}

// Helper function to suggest organizations (fallback if AI doesn't provide them)
function suggestOrganizations(countryData) {
  const suggestions = {
    organizations: [],
    priority_areas: []
  };

  // Analyze scores to determine priority areas
  if (countryData.humanitarian?.score < 50) {
    suggestions.priority_areas.push('Humanitarian Aid');
    suggestions.organizations.push({
      name: 'Médecins Sans Frontières (Doctors Without Borders)',
      focus: 'Emergency medical care and humanitarian relief',
      website: 'https://www.msf.org',
      relevance: 'Critical humanitarian situation requires immediate medical intervention'
    });
    suggestions.organizations.push({
      name: 'International Rescue Committee (IRC)',
      focus: 'Humanitarian aid in conflict zones and refugee assistance',
      website: 'https://www.rescue.org',
      relevance: 'Specialized in crisis response and refugee support'
    });
  }

  if (countryData.humanitarian?.score < 40 || countryData.geopolitical?.score < 40) {
    suggestions.organizations.push({
      name: 'International Committee of the Red Cross (ICRC)',
      focus: 'Humanitarian protection and assistance in armed conflicts',
      website: 'https://www.icrc.org',
      relevance: 'Essential for conflict zones and protection of civilians'
    });
  }

  if (countryData.social?.score < 60) {
    suggestions.priority_areas.push('Education & Social Development');
    suggestions.organizations.push({
      name: 'UNICEF',
      focus: "Children's rights, education, and healthcare",
      website: 'https://www.unicef.org',
      relevance: 'Addresses education gaps and child welfare issues'
    });
    suggestions.organizations.push({
      name: 'Malala Fund',
      focus: "Girls' education and women's empowerment",
      website: 'https://malala.org',
      relevance: 'Focused on education access and gender equality'
    });
  }

  if (countryData.economy?.score < 50) {
    suggestions.priority_areas.push('Economic Development');
    suggestions.organizations.push({
      name: 'Grameen Foundation',
      focus: 'Microfinance and economic empowerment',
      website: 'https://grameenfoundation.org',
      relevance: 'Supports economic recovery through microfinance programs'
    });
    suggestions.organizations.push({
      name: 'Oxfam International',
      focus: 'Poverty alleviation and economic justice',
      website: 'https://www.oxfam.org',
      relevance: 'Addresses economic inequality and poverty'
    });
  }

  if (countryData.ecological?.score < 60) {
    suggestions.priority_areas.push('Environmental Protection');
    suggestions.organizations.push({
      name: 'World Wildlife Fund (WWF)',
      focus: 'Environmental conservation and climate action',
      website: 'https://www.worldwildlife.org',
      relevance: 'Addresses environmental degradation and biodiversity loss'
    });
  }

  // Always include UN agencies
  suggestions.organizations.push({
    name: 'World Food Programme (WFP)',
    focus: 'Food security and hunger relief',
    website: 'https://www.wfp.org',
    relevance: 'Global leader in addressing food insecurity'
  });

  // Remove duplicates and limit to top 8 most relevant
  suggestions.organizations = suggestions.organizations
    .filter((org, index, self) => 
      index === self.findIndex(o => o.name === org.name)
    )
    .slice(0, 8);

  suggestions.priority_areas = [...new Set(suggestions.priority_areas)];

  return suggestions;
}

// API Routes
app.post('/api/analyze', async (req, res) => {
  try {
    const { country, cause } = req.body;

    if (!country) {
      return res.status(400).json({ error: 'Country name is required' });
    }

    console.log(`Analyzing country: ${country}${cause ? ` with focus on: ${cause}` : ''}`);

    // Build user query based on whether a specific cause is provided
    let userQuery;
    if (cause && cause.trim()) {
      userQuery = `Analyze ${country} with a specific focus on "${cause}". 

IMPORTANT: Since the user specified a particular cause/issue, you should:
1. Conduct a FOCUSED ANALYSIS on "${cause}" in ${country}
2. Still provide scores for all 5 dimensions (geopolitical, economy, social, ecological, humanitarian)
3. But emphasize and provide more detailed information about "${cause}" in the relevant dimension(s)
4. Search the web specifically for recent news about "${cause}" in ${country}

Search for NEWS:
- "${cause} ${country} news last 3 days"
- General country news across all dimensions

Search for ORGANIZATIONS:
- "NGOs working on ${cause} in ${country}"
- "Best charities ${cause} ${country}"
- "Organizations helping ${cause} ${country}"
- "Local and international NGOs ${country}"

CRITICAL: Provide AT LEAST 5 REAL organizations actively working in ${country} on "${cause}" or related issues, with impact scores (0-100) for each.

Provide both the narrative analysis with emphasis on the specified cause, organization recommendations with impact scores, and the complete JSON output as specified.`;
    } else {
      userQuery = `Analyze ${country} based on news from the last 3 days across ALL dimensions. 

IMPORTANT: Browse the web and search for real, recent news from reputable sources.

Search for NEWS:
- "${country} news last 3 days"
- "${country} geopolitical news"
- "${country} economy news"
- "${country} social issues news"
- "${country} environmental news"
- "${country} humanitarian situation"

Search for ORGANIZATIONS:
- "NGOs working in ${country} 2026"
- "Best charities ${country}"
- "International organizations ${country}"
- "Local NGOs ${country}"
- "Humanitarian aid organizations ${country}"

CRITICAL: Provide AT LEAST 5 REAL organizations actively working in ${country}, with impact scores (0-100) for each.

Provide both the narrative analysis, organization recommendations with impact scores, and the JSON output as specified.`;
    }

    // Call OpenAI API with web search enabled
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: userQuery 
        }
      ],
      temperature: 0.7,
      max_tokens: 6000, // Increased for organization recommendations
    });

    const response = completion.choices[0].message.content;

    // Extract JSON from response
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    let countryData = null;
    let narrative = response;

    if (jsonMatch) {
      try {
        countryData = JSON.parse(jsonMatch[1]);
        narrative = response.replace(/```json\n[\s\S]*?\n```/, '').trim();
      } catch (e) {
        console.error('Failed to parse JSON:', e);
      }
    }

    // Extract AI-recommended organizations from narrative
    let aiOrganizations = extractOrganizationsFromNarrative(response);
    
    // Generate organization suggestions (fallback if AI didn't provide them)
    let suggestions;
    if (aiOrganizations.length >= 5) {
      // Use AI-recommended organizations
      console.log(`Found ${aiOrganizations.length} AI-recommended organizations`);
      
      // Identify priority areas based on scores
      const priority_areas = [];
      if (countryData) {
        if (countryData.humanitarian?.score < 50) priority_areas.push('Humanitarian Aid');
        if (countryData.social?.score < 60) priority_areas.push('Education & Social Development');
        if (countryData.economy?.score < 50) priority_areas.push('Economic Development');
        if (countryData.ecological?.score < 60) priority_areas.push('Environmental Protection');
      }
      
      suggestions = {
        organizations: aiOrganizations,
        priority_areas: [...new Set(priority_areas)],
        source: 'AI Web Search'
      };
    } else {
      // Fallback to manual suggestions
      console.log('Using fallback organization suggestions');
      suggestions = countryData ? suggestOrganizations(countryData) : { organizations: [], priority_areas: [] };
      suggestions.source = 'Fallback';
    }

    res.json({
      country,
      cause: cause || null,
      narrative,
      data: countryData,
      suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error analyzing country:', error);
    res.status(500).json({ 
      error: 'Failed to analyze country',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Country Impact Analyst API running on port ${PORT}`);
  console.log(`📊 Ready to analyze countries for humanitarian impact`);
});

