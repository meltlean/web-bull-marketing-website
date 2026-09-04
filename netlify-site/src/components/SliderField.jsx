import React from 'react';

export default function SliderField({ label, value, onChange }) {
  return (
    <div className="field">
      <label>{label} <span className="live-val">{value}%</span></label>
      <input
        type="range" min="0" max="100" value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        style={{ '--fill': `${value}%` }}
      />
    </div>
  );
}
