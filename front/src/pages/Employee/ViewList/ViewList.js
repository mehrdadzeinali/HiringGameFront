import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewList.css';
import { Link } from 'react-router-dom';
import API_ENDPOINTS from '../../../configs/urls';

const ViewEmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [countries, setCountries] = useState(["Choose the country","USA", "Canada", "UK", "India"]);
    const [cities, setCities] = useState(["Choose the city","New York", "Toronto", "London", "Mumbai"]);
    const [workTypes, setWorkTypes] = useState(["Choose the work type","remote", "no remote"]);
    const [situations, setSituations] = useState(["Active", "On Leave", "Retired", "Fired"]);
    const [languages, setLanguages] = useState(["English", "French", "Spanish", "Hindi"]);
    const [experiences, setExperiences] = useState(["Choose the experience", "1-2 years", "3-5 years", "6-10 years", "10+ years"]);

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);

      console.log('mehrdad')
      console.log(API_ENDPOINTS.employee.viewList)
    
      axios.get(API_ENDPOINTS.employee.viewList, {
        params: {
          category: urlParams.get('category'),
          jobTitle: urlParams.get('jobTitle'),
          workType: urlParams.get('workType'),
          city: urlParams.get('city'),
          country: urlParams.get('country')
        }
      })
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees', error);
      });
    }, []);    

    return (
        <div className="list-page-view">
            <div className="side-panel">
                {/* Filters */}
                <div className="filter-section">
                    <div>
                        <label className="filter-label" htmlFor="country">Country:</label>
                        <select id="country" className="filter-input">
                            {countries.map(country => (
                                <option value={country} key={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="city">City:</label>
                        <select id="city" className="filter-input">
                            {cities.map(city => (
                                <option value={city} key={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="experience">Experience:</label>
                        <select id="experience" className="filter-input">
                            {experiences.map(experience => (
                                <option value={experience} key={experience}>{experience}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="work-type">Work Type:</label>
                        <select id="work-type" className="filter-input">
                            {workTypes.map(workType => (
                                <option value={workType} key={workType}>{workType}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="situation">Situation:</label>
                        <select id="situation" className="filter-input">
                            {situations.map(situation => (
                                <option value={situation} key={situation}>{situation}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="languages">Languages:</label>
                        <select id="languages" className="filter-input">
                            {languages.map(language => (
                                <option value={language} key={language}>{language}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="profile-container">
                <div className="employee-grid">
                    {employees.map((employee, index) => (
                      <Link to={`/employee/view/${employee.id}`} key={index}>
                          <div className="employee-square">
                              <img src={employee.profilePhoto} alt={employee.firstName} className="profile-photo-view" />
                              <div className="employee-info">
                                  <div className="employee-name">{employee.firstName + ' ' + employee.lastName}</div>
                                  <div className="employee-job-title">{employee.jobTitle}</div>
                                  <div className="employee-experience">{employee.experience} years of experience</div>
                              </div>
                          </div>
                      </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeList;
