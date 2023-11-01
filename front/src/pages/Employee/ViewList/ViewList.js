import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewList.css';

const ViewEmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employee/list')
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
                            {/* Populate with country options */}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="city">City:</label>
                        <select id="city" className="filter-input">
                            {/* Populate with city options */}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="experience">Experience:</label>
                        <select id="experience" className="filter-input">
                            <option value="1-2">1-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="10+">10+ years</option>
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="work-type">Work Type:</label>
                        <select id="work-type" className="filter-input">
                            {/* Populate with work type options */}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="situation">Situation:</label>
                        <select id="situation" className="filter-input">
                            {/* Populate with situation options */}
                        </select>
                    </div>

                    <div>
                        <label className="filter-label" htmlFor="languages">Languages:</label>
                        <select id="languages" className="filter-input">
                            {/* Populate with language options */}
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="profile-container">
                <div className="employee-grid">
                    {employees.map((employee, index) => (
                        <div key={index} className="employee-square">
                            <img src={employee.profilePhoto} alt={employee.firstName} className="profile-photo-view" />
                            <div className="employee-info">
                                <div className="employee-name">{employee.firstName + ' ' + employee.lastName}</div>
                                <div className="employee-job-title">{employee.jobTitle}</div>
                                <div className="employee-experience">{employee.experience} years of experience</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeList;
