// src/components/ViewEmployeeProfile/ViewEmployeeProfile.js

import React, { useState, useEffect } from 'react';
import './ViewProfile.css';
import axios from 'axios';

function ViewEmployeeProfile() {
  // This is just a mock state. Ideally, you'd fetch this data from your API.
  const [employeeData, setEmployeeData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    category: 'Engineering',
    jobTitle: 'Software Engineer',
    experience: '5 years',
    workType: 'Full-time',
    country: 'USA',
    city: 'San Francisco',
    situation: 'Single',
    languages: 'English, Spanish',
    cv: null,
    profilePhoto: null,
  });

  useEffect(() => {
    const employeeId = 10;

    axios.get(`http://localhost:3000/api/employee/${employeeId}`).then(response => setEmployeeData(response.data));
  }, []);

  return (
    <div className="profile-page-view">
      <img src={employeeData.profilePhoto} alt="Employee Profile" className="profile-photo-view"/>
      
      <div className="employee-info-view">
        <h2>{employeeData.firstName} {employeeData.lastName}</h2>
        <p><strong>Email:</strong> {employeeData.email}</p>
        <p><strong>Phone:</strong> {employeeData.phone}</p>
        <p><strong>LinkedIn:</strong> <a href={employeeData.linkedin}>LinkedIn Profile</a></p>
        <p><strong>Category:</strong> {employeeData.category}</p>
        <p><strong>Job Title:</strong> {employeeData.jobTitle}</p>
        <p><strong>Experience:</strong> {employeeData.experience}</p>
        <p><strong>Work Type:</strong> {employeeData.workType}</p>
        <p><strong>Country:</strong> {employeeData.country}</p>
        <p><strong>City:</strong> {employeeData.city}</p>
        <p><strong>Situation:</strong> {employeeData.situation}</p>
        <p><strong>Languages:</strong> {employeeData.languages}</p>
        {employeeData.cv && <a href={employeeData.cv} download className="download-cv-button">Download CV</a>}
      </div>
    </div>
  );
}

export default ViewEmployeeProfile;
