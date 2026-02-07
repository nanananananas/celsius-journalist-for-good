import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './ScoreChart.css';

const ScoreChart = ({ data }) => {
  const getScoreColor = (score) => {
    if (score >= 70) return '#10b981';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const chartData = [
    { name: 'Geopolitical', score: data.geopolitical?.score || 0 },
    { name: 'Economy', score: data.economy?.score || 0 },
    { name: 'Social', score: data.social?.score || 0 },
    { name: 'Ecological', score: data.ecological?.score || 0 },
    { name: 'Humanitarian', score: data.humanitarian?.score || 0 }
  ];

  return (
    <div className="score-chart">
      <h3>Dimension Scores Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" name="Score">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="score-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#10b981' }}></span>
          <span>Good (70-100)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#f59e0b' }}></span>
          <span>Moderate (40-69)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#ef4444' }}></span>
          <span>Critical (0-39)</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;

