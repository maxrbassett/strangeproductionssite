import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="search-bar">
    <span className="search-icon">⌕</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search videos…"}
      spellCheck={false}
    />
    {value && (
      <button className="search-clear" onClick={() => onChange("")}>
        ✕
      </button>
    )}
  </div>
);

export default SearchBar;
