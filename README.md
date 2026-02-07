# 🌍 Country Impact Analyst

An AI-powered humanitarian impact assessment and geopolitical risk evaluation tool designed for philanthropists, NGO strategists, and social impact investors.

## 🎯 Overview

Country Impact Analyst uses OpenAI's GPT-4o to provide comprehensive country assessments based on the latest news (last 3 days) across multiple dimensions:

- **Geopolitical Situation** - External relations, conflicts, diplomatic tensions
- **Economy** - Economic crisis, inflation, unemployment, housing
- **Social Issues** - Education, gender equality, labor rights
- **Ecological Situation** - Climate change, natural disasters, environmental policies
- **Humanitarian Situation** - Armed conflicts, health crises, famine, refugee situations

Each dimension receives a score (0-100) to help identify areas of greatest need and maximum impact potential.

## ✨ Features

- **Real-time Analysis**: Analyzes recent news from the last 3 days
- **Multi-dimensional Scoring**: Evaluates countries across 5 key dimensions
- **Visual Analytics**: Interactive charts showing dimension scores
- **Organization Recommendations**: Suggests relevant NGOs and humanitarian organizations
- **Dual Output**: Both narrative analysis and structured JSON data
- **Beautiful UI**: Modern, professional interface designed for decision-makers

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd country-analyst
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

   Or use the convenience script:
   ```bash
   npm run install-all
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

### Running the Application

**Development mode** (runs both backend and frontend):
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

**Production build**:
```bash
npm run build
```

## 📖 Usage

1. Open your browser to `http://localhost:3000`
2. Enter a country name (e.g., "Ukraine", "Haiti", "Yemen")
3. Click "Analyze" or press Enter
4. Wait 30-60 seconds for the AI analysis
5. Review the results:
   - **Narrative Analysis**: Detailed write-up of each dimension
   - **JSON Data**: Structured data for programmatic use
   - **Organization Recommendations**: Suggested NGOs and focus areas

## 🏗️ Project Structure

```
country-analyst/
├── server/
│   └── index.js              # Express API server with OpenAI integration
├── client/
│   ├── public/
│   │   └── index.html        # HTML template
│   └── src/
│       ├── components/
│       │   ├── CountryInput.js           # Input form component
│       │   ├── AnalysisResults.js        # Results display
│       │   ├── ScoreChart.js             # Score visualization
│       │   └── OrganizationSuggestions.js # NGO recommendations
│       ├── App.js            # Main application
│       ├── App.css           # Main styles
│       └── index.js          # React entry point
├── package.json              # Backend dependencies
├── .env.example              # Environment template
└── README.md                 # This file
```

## 📊 Scoring System

Each dimension is scored 0-100 based on objective criteria:

### Geopolitical (0-100)
- **90-100**: Stable democracy, strong international partnerships
- **70-89**: Generally stable, minor tensions
- **40-69**: Moderate instability or sanctions
- **20-39**: Significant conflicts or isolation
- **0-19**: Active warfare, collapsed diplomacy

### Economy (0-100)
- **90-100**: Strong growth, low unemployment (<4%)
- **70-89**: Moderate growth, manageable inflation
- **40-69**: Recession, high unemployment (>8%)
- **20-39**: Severe crisis, hyperinflation
- **0-19**: Economic collapse

### Social (0-100)
- **90-100**: Universal education, gender parity
- **70-89**: Good access, progressive policies
- **40-69**: Limited rights, education gaps
- **20-39**: Systemic discrimination
- **0-19**: Institutionalized oppression

### Ecological (0-100)
- **90-100**: Leading climate action, minimal disasters
- **70-89**: Active policies, manageable challenges
- **40-69**: Limited action, recurring disasters
- **20-39**: Crisis impacts, minimal policy
- **0-19**: Environmental catastrophe

### Humanitarian (0-100)
- **90-100**: Peace, universal healthcare, food security
- **70-89**: Stable peace, good healthcare
- **40-69**: Localized conflicts, healthcare gaps
- **20-39**: Active conflict, health crisis
- **0-19**: Genocide, famine, war crimes

## 🤝 Organization Recommendations

The system automatically suggests relevant organizations based on the analysis:

- **Humanitarian Aid**: MSF, IRC, ICRC
- **Education & Social**: UNICEF, Malala Fund
- **Economic Development**: Grameen Foundation, Oxfam
- **Environmental**: WWF
- **Food Security**: World Food Programme

Recommendations are prioritized based on identified needs.

## 🔧 API Endpoints

### POST `/api/analyze`
Analyzes a country and returns comprehensive assessment.

**Request**:
```json
{
  "country": "Ukraine"
}
```

**Response**:
```json
{
  "country": "Ukraine",
  "narrative": "Markdown formatted analysis...",
  "data": {
    "country": "Ukraine",
    "overall_score": 45,
    "analysis_date": "2026-02-07",
    "geopolitical": { "score": 25, "sub_topics": {...} },
    "economy": { "score": 40, "sub_topics": {...} },
    ...
  },
  "suggestions": {
    "priority_areas": ["Humanitarian Aid", "Social Development"],
    "organizations": [...]
  },
  "timestamp": "2026-02-07T12:00:00.000Z"
}
```

### GET `/api/health`
Health check endpoint.

## 🎨 Customization

### Styling
- Modify colors in CSS files under `client/src/components/`
- Main gradient: `client/src/index.css`

### Adding Organizations
- Edit `suggestOrganizations()` function in `server/index.js`
- Add conditions based on dimension scores

### Adjusting Analysis Prompt
- Modify `SYSTEM_PROMPT` in `server/index.js`
- Customize dimensions, scoring criteria, or output format

## 🔒 Security Considerations

- Never commit `.env` file to version control
- Use environment variables for API keys
- Implement rate limiting for production use
- Add authentication if deploying publicly
- Validate and sanitize all user inputs

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables in your hosting platform
2. Ensure `NODE_ENV=production`
3. Deploy the root directory

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `client/build` directory
3. Update API endpoint in frontend if backend is hosted separately

## 📝 License

MIT License - Feel free to use this for humanitarian purposes!

## 🤔 FAQ

**Q: How often is the data updated?**
A: The analysis is based on news from the last 3 days, fetched in real-time during each analysis.

**Q: Can I analyze multiple countries at once?**
A: Currently, the app analyzes one country at a time. Run separate analyses for multiple countries.

**Q: How accurate are the scores?**
A: Scores are AI-generated based on recent news and may not reflect all nuances. Always verify with multiple sources.

**Q: Can I export the results?**
A: Yes, use the JSON tab to copy structured data. You can also copy the narrative analysis.

**Q: Does this work for all countries?**
A: Yes, but analysis quality depends on news availability. Countries with limited international coverage may have less comprehensive results.

## 🙏 Credits

Built with:
- React
- Express.js
- OpenAI GPT-4o
- Recharts
- React Markdown

Designed for humanitarian impact optimization.

## 📧 Support

For issues, feature requests, or questions, please open an issue in the repository.

---

**Remember**: This tool is designed to help identify opportunities for humanitarian impact. Lower scores often indicate greater need for support, not condemnation. Always conduct thorough due diligence before making donation decisions.

