import React, { useState } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';

const PersonalizedSearchPage = () => {
  const [category, setCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [workType, setWorkType] = useState('');
  const [city, setCity] = useState('');
  const [Country, setCountry] = useState('');

  const jobTitlesInCategory = {
    'Informatique': ['Developer', 'System Admin', 'Data Analyst'],
    'Healthcare': ['Nurse', 'Doctor', 'Technician']
  };

  const handleSearch = () => {
    console.log(`Searching for ${jobTitle} in ${category} that is ${workType} in ${city}`);
  };

  return (
    <div className="personalized-bg-container">
      <Link to="/home">
          <button className="hiring-game-button">HiringGame!</button>
      </Link>
      <div className="personalized-search-container">
        <h1>Search your ideal employee!</h1>

        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>Select a category</option>
            <option value='Informatique'>Informatique</option>
            <option value='Healthcare'>Healthcare</option>
          </select>
        </label>

        {category && (
          <label>
            Job Title:
            <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
              <option value=''>Select a job title</option>
              {jobTitlesInCategory[category].map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </label>
        )}

        {jobTitle && (
          <label>
            Work Type:
            <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
              <option value=''>Select work type</option>
              <option value='Remote'>Remote</option>
              <option value='Not Remote'>Not Remote</option>
            </select>
          </label>
        )}

        {jobTitle && workType === 'Not Remote' && (
          <label>
            Country:
            <input type='text' value={Country} onChange={(e) => setCountry(e.target.value)} />
          </label>
        )}

        {jobTitle && workType === 'Not Remote' && (
          <label>
            City:
            <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
        )}

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default PersonalizedSearchPage;
