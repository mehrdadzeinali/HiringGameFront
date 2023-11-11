import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Typewriter from '../../tools/TypeWriter';

function MyHomePage() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const handleFindTalentClick = () => {
    if (isAuthenticated()) {
      navigate('/employee/search');
    } else {
      navigate('/auth/signup');
    }
  };

  const handleCreateProfileClick = () => {
    if (isAuthenticated()) {
      navigate('/employee/create');
    } else {
      navigate('/auth/signup');
    }
  };

  return (
    <div className="home-bg-container">
      <div className="container">
        {/* Employer Section */}
        <div className="employer-container">
          <div className="text-wrapper">
            <h1>Discover Top Talent with Ease!</h1>
            <p>
              Searching for the perfect candidate to join your team can be a daunting process. Sifting through piles of resumes, conducting endless interviews, and still not finding the right fit? Bid those days goodbye! Our platform has revolutionized the hiring process. By showcasing detailed profiles of potential hires, you can now match your requirements with candidates' skills, experience, and aspirations. Dive in and explore a world where hiring is not just efficient but also delightful!
            </p>
          </div>
          <button 
            id="employerBtn" 
            className="personalized-button-find button-spacing"
            onClick={handleFindTalentClick}
          >
            Find Talent
          </button>
        </div>

        {/* Employee Section */}
        <div className="employee-container">
          <div className="text-wrapper">
            <h1>Let Your Dream Job Find You!</h1>
            <p>
              In today's competitive job market, standing out can be a challenge. But what if you could showcase all that you offer in one comprehensive profile? With our platform, that's a reality! Create a detailed profile highlighting your skills, experiences, aspirations, and let potential employers discover you. No more endless job applications – just sit back, relax, and wait for your next career opportunity to find you.
            </p>
          </div>
          <button 
            id="employeeBtn" 
            className="personalized-button button-spacing"
            onClick={handleCreateProfileClick}
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyHomePage;
