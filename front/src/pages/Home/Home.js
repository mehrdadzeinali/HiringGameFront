import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function MyHomePage() {
  return (
    <div className="home-bg-container">
      <div className="my-home-container">
        <h1 id="welcomeTitle">Welcome to HirinGame!</h1>
        <p id="descriptionText1">Changing the hiring game, one match at a time. At The Hiring Game, we flip the conventional job search on its head.</p>
        <p id="descriptionText2">Are you an employer? Say goodbye to sifting through hundreds of resumes. Our platform allows you to find the perfect candidate by browsing profiles that fit your specific needs.</p>
        <p id="descriptionText3">Are you seeking employment? Showcase your skills, experience, and aspirations on your profile, and let your next job find you!</p>
        <p id="descriptionText4">Experience a new, simplified, and more efficient way of connecting talent with opportunity.</p>
        <Link to="/employee/search">
          <button id="getStartedBtn" className="personalized-button button-spacing">Find a new colleague!</button>
        </Link>
        <Link to="/employee/create">
          <button id="getStartedBtn" className="personalized-button button-spacing">Wait a new job!</button>
        </Link>
      </div>
    </div>
  );
}

export default MyHomePage;
