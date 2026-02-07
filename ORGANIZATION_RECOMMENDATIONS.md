# 🤝 Enhanced Organization Recommendations

## Overview

Version 2.1 introduces **AI-powered web browsing** to find and recommend the **most active and impactful organizations** working in each country and on specific causes.

## Key Features

### 1. **Web-Based Organization Discovery**
- AI **actively searches the web** for organizations working in the analyzed country
- Searches for both international NGOs and local organizations
- Considers the specific cause if provided by the user
- Returns **at least 5 real, verified organizations**

### 2. **Impact Scoring (0-100)**
Each organization receives an impact score based on:

| Criteria | Points | Description |
|----------|--------|-------------|
| **Active Presence** | 0-25 | Physical presence and operations in the country |
| **Track Record** | 0-25 | History of effectiveness and results |
| **Relevance** | 0-25 | Match with identified needs and focus areas |
| **Scale** | 0-25 | Reach and scope of operations |

**Impact Score Ranges:**
- **80-100**: Very High Impact (Excellent presence and proven results)
- **60-79**: High Impact (Strong operations and effectiveness)
- **40-59**: Moderate Impact (Growing presence)
- **0-39**: Emerging Impact (New or limited operations)

### 3. **Comprehensive Organization Profiles**

Each recommendation includes:
- ✅ **Name**: Full organization name
- ✅ **Impact Score**: 0-100 rating
- ✅ **Focus Area**: What they work on in this country
- ✅ **Presence Type**: International / Local / Regional
- ✅ **Recent Activities**: What they've done recently in the country
- ✅ **Website**: Official URL
- ✅ **How to Support**: Direct donation link or contact method

### 4. **Intelligent Search Patterns**

The AI searches for:

**General Analysis:**
- "NGOs working in [Country] 2026"
- "Best charities [Country]"
- "International organizations [Country]"
- "Local NGOs [Country]"
- "Humanitarian aid organizations [Country]"

**Cause-Specific Analysis:**
- "NGOs working on [Cause] in [Country]"
- "Best charities [Cause] [Country]"
- "Organizations helping [Cause] [Country]"
- "Local and international NGOs [Country] [Cause]"

## How It Works

### Backend Process

```
User Input → Country + Optional Cause
     ↓
AI Web Search
     ├─ Search for country news (3 days)
     ├─ Search for organizations
     └─ Evaluate each organization
     ↓
Extract Organizations from Narrative
     ├─ Parse structured data
     ├─ Calculate impact scores
     └─ Verify minimum 5 organizations
     ↓
Return to Frontend
```

### Frontend Display

```
┌──────────────────────────────────────────────────┐
│ 🤝 Recommended Organizations for Ukraine         │
│ Based on web research and analysis      ✓ Web-  │
│ these organizations are actively working  Verified│
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Organization Name                    Impact: 85/100│
│                               Very High Impact     │
│ [International]                                   │
│                                                   │
│ Focus Area: Emergency medical care               │
│ Recent Activities: Operating 12 hospitals...     │
│                                                   │
│ [🌐 Visit Website]  [💝 Support Them]           │
└──────────────────────────────────────────────────┘
```

## Examples

### Example 1: General Country Analysis

**Input:**
```
Country: Yemen
Cause: [blank]
```

**AI Searches For:**
- "NGOs working in Yemen 2026"
- "Best charities Yemen"
- "International organizations Yemen"
- "Humanitarian aid organizations Yemen"

**Expected Results:**
1. **Médecins Sans Frontières** - Impact: 92/100
2. **World Food Programme** - Impact: 88/100
3. **Save the Children Yemen** - Impact: 85/100
4. **UNICEF Yemen** - Impact: 83/100
5. **Yemen Relief and Reconstruction Foundation** - Impact: 76/100

### Example 2: Cause-Specific Analysis

**Input:**
```
Country: Argentina
Cause: gender equality
```

**AI Searches For:**
- "NGOs working on gender equality in Argentina"
- "Best charities gender equality Argentina"
- "Women's rights organizations Argentina"
- "Gender equality initiatives Argentina"

**Expected Results:**
1. **Fundación Mujeres en Igualdad** - Impact: 87/100
2. **ELA - Equipo Latinoamericano de Justicia y Género** - Impact: 84/100
3. **UN Women Argentina** - Impact: 81/100
4. **Asociación Civil por la Igualdad y la Justicia** - Impact: 78/100
5. **Casa del Encuentro** - Impact: 75/100

### Example 3: Education Focus

**Input:**
```
Country: Kenya
Cause: education
```

**AI Searches For:**
- "NGOs working on education in Kenya"
- "Best education charities Kenya"
- "Organizations helping education Kenya"
- "Education initiatives Kenya"

**Expected Results:**
1. **Bridge International Academies** - Impact: 89/100
2. **Teach For Kenya** - Impact: 85/100
3. **Elimu Foundation** - Impact: 82/100
4. **Kenya Education Fund** - Impact: 78/100
5. **Room to Read Kenya** - Impact: 76/100

## UI Features

### Visual Elements

**Impact Score Badge:**
- Color-coded by score level
  - 🟢 Green (80-100): Very High Impact
  - 🔵 Blue (60-79): High Impact
  - 🟡 Yellow (40-59): Moderate Impact
  - 🔴 Red (0-39): Growing Impact
- Large, prominent display
- Clear label below score

**Presence Badge:**
- Shows organization type
- Examples: "International", "Local", "Regional"
- Styled with subtle background

**Web-Verified Badge:**
- Appears when organizations come from AI web search
- Green checkmark ✓
- Indicates real-time research

**Action Buttons:**
- 🌐 **Visit Website**: Link to organization's site
- 💝 **Support Them**: Direct donation/support link
- Hover effects and animations
- Fully responsive

### Organization Card Layout

```
┌───────────────────────────────────────────┐
│ [Organization Name]         [85/100]      │
│                          [Very High Impact]│
│ [International]                           │
│                                           │
│ Focus Area: Emergency medical care        │
│                                           │
│ Recent Activities:                        │
│ │ Operating 12 hospitals in conflict...  ││
│                                           │
│ [🌐 Visit Website] [💝 Support Them]     │
└───────────────────────────────────────────┘
```

## Technical Implementation

### Backend Changes

**File: `server/index.js`**

1. **Updated System Prompt:**
   - Added organization search requirements
   - Specified impact scoring criteria
   - Required minimum 5 organizations

2. **New Function: `extractOrganizationsFromNarrative()`**
   - Parses AI response for organization section
   - Extracts structured data
   - Returns array of organization objects

3. **Enhanced API Response:**
   - Increased max_tokens to 6000
   - Includes `cause` in response
   - Returns `source` indicator

4. **Smart Fallback:**
   - Uses AI recommendations if ≥5 found
   - Falls back to manual suggestions otherwise
   - Logs source for debugging

### Frontend Changes

**File: `client/src/components/OrganizationSuggestions.js`**

1. **Impact Score Display:**
   - `getImpactColor()` - Color based on score
   - `getImpactLabel()` - Text label for score range
   - Visual badge component

2. **Enhanced Card Layout:**
   - Title + Impact Score section
   - Presence badge
   - Recent activities highlight
   - Action buttons

**File: `client/src/components/OrganizationSuggestions.css`**

1. **New Styles:**
   - `.impact-score-badge` - Score display
   - `.presence-badge` - Organization type
   - `.org-activities` - Recent work section
   - `.org-actions` - Button container
   - `.org-button` - Base button styles
   - Color-coded impact indicators

2. **Responsive Design:**
   - Stacks on mobile
   - Touch-friendly buttons
   - Optimized layout

## API Changes

### Request

```json
POST /api/analyze

{
  "country": "Kenya",
  "cause": "education"  // Optional
}
```

### Response

```json
{
  "country": "Kenya",
  "cause": "education",
  "narrative": "...",
  "data": { ... },
  "suggestions": {
    "organizations": [
      {
        "name": "Bridge International Academies",
        "impact_score": 89,
        "focus": "Low-cost primary education across Kenya",
        "presence": "Local with International Support",
        "recent_activities": "Expanded to 400+ schools serving 120,000 students in 2026",
        "website": "https://www.bridgeinternationalacademies.com",
        "how_to_support": "https://donate.bridgeinternationalacademies.com",
        "relevance": "Leading education provider in Kenya"
      },
      // ... 4+ more organizations
    ],
    "priority_areas": ["Education & Social Development"],
    "source": "AI Web Search"  // or "Fallback"
  },
  "timestamp": "2026-02-07T12:00:00.000Z"
}
```

## Benefits

### For Donors
✅ **Real Organizations**: Verified through web research
✅ **Impact Metrics**: Clear scoring to guide decisions
✅ **Recent Context**: What they're doing right now
✅ **Direct Links**: Easy to visit and support
✅ **Local + International**: Mix of organization types

### For NGO Strategists
✅ **Market Intelligence**: Who's active in the region
✅ **Partnership Opportunities**: Find collaborators
✅ **Gap Analysis**: Identify underserved areas
✅ **Benchmarking**: Compare organization impact

### For Researchers
✅ **Structured Data**: Machine-readable format
✅ **Source Tracking**: Know origin of recommendations
✅ **Reproducible**: Can verify and validate
✅ **Comprehensive**: Multiple dimensions covered

## Validation & Quality

### AI Prompts Include:
- Emphasis on **real, active organizations**
- Requirement for **current web research**
- Minimum **5 organizations**
- Impact scoring **criteria and justification**
- **Recent activities** requirement
- **Valid websites** and contact methods

### User Verification:
The UI encourages users to:
- Visit organization websites
- Check Charity Navigator
- Review GuideStar profiles
- Verify GiveWell ratings
- Conduct own due diligence

## Future Enhancements

### Planned Features
- [ ] **Financial Transparency**: Add budget/expense data
- [ ] **User Reviews**: Integrate donor feedback
- [ ] **Historical Tracking**: Monitor changes over time
- [ ] **Comparison Tool**: Compare organizations side-by-side
- [ ] **Direct Contact**: Integration with organization APIs
- [ ] **Donation Tracking**: Track user contributions
- [ ] **Impact Reports**: Fetch and display recent reports
- [ ] **Local Currency**: Show donation amounts in local currency

### Potential Integrations
- Charity Navigator API
- GuideStar API
- GiveWell data feeds
- Organization RSS feeds
- Social media metrics

## Testing

### Test Scenarios

**1. Crisis Region with General Analysis**
```
Country: Yemen
Cause: [blank]
Expected: 5+ humanitarian orgs with high scores
```

**2. Stable Country with Specific Cause**
```
Country: Norway
Cause: climate change
Expected: 5+ environmental orgs, mix of int'l and local
```

**3. Developing Country with Social Issue**
```
Country: India
Cause: gender equality
Expected: 5+ women's rights orgs, emphasis on local
```

**4. Multiple Causes Indicated**
```
Country: Brazil
Cause: education and environment
Expected: Mixed orgs covering both areas
```

## Troubleshooting

### Issue: Fewer than 5 organizations returned
**Cause**: AI couldn't find enough organizations
**Solution**: System automatically falls back to manual suggestions
**Check**: `suggestions.source` field in response

### Issue: Impact scores seem inaccurate
**Cause**: AI scoring based on limited web data
**Solution**: Encourage user verification via external platforms
**Note**: Scores are estimates, not definitive ratings

### Issue: Broken website links
**Cause**: Organizations changed URLs
**Solution**: AI searches for current URLs, but some may be outdated
**Mitigation**: Users should verify and report issues

## Conclusion

The Enhanced Organization Recommendations system provides:
- ✅ **Real-time web research**
- ✅ **Minimum 5 organizations per analysis**
- ✅ **Impact scoring (0-100)**
- ✅ **Cause-specific filtering**
- ✅ **Comprehensive organization profiles**
- ✅ **Beautiful, intuitive UI**

This feature empowers donors to make informed decisions and connect directly with organizations creating real impact.

---

**Version**: 2.1
**Date**: February 7, 2026  
**Status**: ✅ Production Ready

