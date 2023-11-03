import React, { useState, useEffect } from 'react';
import './ViewProfile.css'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_ENDPOINTS from '../../../configs/urls';

function ViewEmployeeProfile() {
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

  const { employeeId } = useParams();

  useEffect(() => {
      axios.get(API_ENDPOINTS.employee.viewProfile(employeeId))
           .then(response => setEmployeeData(response.data));
  }, [employeeId]);
  

  return (
    <div className="profile-page-view">
      <div className="profile-container">
      <Link to="/home">
        <button className="hiring-game-button">HiringGame!</button>
      </Link>
        <img src={employeeData.profilePhoto} alt="Employee Profile" className="profile-photo-view"/>
        <h2>{employeeData.firstName} {employeeData.lastName}</h2>
      </div>

      <div className="employee-info-view">
        <div className="info-card">
          <span className="icon">📧</span> 
          <span><strong>Email:</strong> {employeeData.email}</span>
        </div>
        <div className="info-card">
          <span className="icon">📞</span>
          <span><strong>Phone:</strong> {employeeData.phone}</span>
        </div>
        <div className="info-card">
          <span className="icon">🔗</span>
          <span><strong>LinkedIn:</strong> <a href={employeeData.linkedin.startsWith("http") ? employeeData.linkedin : `https://${employeeData.linkedin}`}>LinkedIn Profile</a></span>
        </div>
        <div className="info-card">
          <span className="icon">🚀</span>
          <span><strong>Category:</strong> {employeeData.category}</span>
        </div>
        <div className="info-card">
          <span className="icon">👔</span>
          <span><strong>Job Title:</strong> {employeeData.jobTitle}</span>
        </div>
        <div className="info-card">
          <span className="icon">⏳</span>
          <span><strong>Experience:</strong> {employeeData.experience}</span>
        </div>
        <div className="info-card">
          <span className="icon">🕒</span>
          <span><strong>Work Type:</strong> {employeeData.workType}</span>
        </div>
        <div className="info-card">
          <span className="icon">🌍</span>
          <span><strong>Country:</strong> {employeeData.country}</span>
        </div>
        <div className="info-card">
          <span className="icon">🏙️</span>
          <span><strong>City:</strong> {employeeData.city}</span>
        </div>
        <div className="info-card">
          <span className="icon">💼</span>
          <span><strong>Situation:</strong> {employeeData.situation}</span>
        </div>
        <div className="info-card">
          <span className="icon">🗣️</span>
          <span><strong>Languages:</strong> {employeeData.languages}</span>
        </div>
        {employeeData.cv && 
          <div className="info-card">
            <span className="icon">📄</span>
            <span><a href={employeeData.cv} download className="download-cv-button">Download CV</a></span>
          </div>
        }
      </div>
    </div>
  );
}

export default ViewEmployeeProfile;
