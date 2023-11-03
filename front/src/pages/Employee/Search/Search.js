import React, { useState } from 'react';
import './Search.css';

const PersonalizedSearchPage = () => {
  const [category, setCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [workType, setWorkType] = useState('');
  const [city, setCity] = useState('');
  const [Country, setCountry] = useState('');

  const jobTitlesInCategory = {
    'Category 1': ['Job Title 1', 'Job Title 2', 'Job Title 3'],
    'Category 2': ['Job Title 1', 'Job Title 2', 'Job Title 3']
  };

  const handleSearch = () => {
    const queryParams = [];
    
    if (category) queryParams.push(`category=${category}`);
    if (jobTitle) queryParams.push(`jobTitle=${jobTitle}`);
    if (workType) queryParams.push(`workType=${workType}`);
    if (city) queryParams.push(`city=${city}`);
    if (Country) queryParams.push(`country=${Country}`);
  
    window.location.href = `/employee/list?${queryParams.join('&')}`;
  };
  

  return (
    <div className="search-page-bg-ctn">
      <div className="search-ctn">
        <h1>Search your ideal employee!</h1>

        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>Select a category</option>
            <option value='Category 1'>Category 1</option>
            <option value='Category 2'>Category 2</option>
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
      </div>
      <button className="personalized-search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default PersonalizedSearchPage;
