import React from 'react';
import './CreateProfile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            linkedin: '',
            category: '',
            jobTitle: '',
            experience: '',
            workType: '',
            country: '',
            city: '',
            situation: '',
            languages: '',
            cv: null,
            profilePhoto: null,
            submitted: false,
        };
    }

    handleSubmit = async () => {
        const { cv, profilePhoto, ...otherData } = this.state;
        const formData = new FormData();

        // Append files to the FormData object
        if (cv) {
            formData.append('cv', cv);
        }
        if (profilePhoto) {
            formData.append('profilePhoto', profilePhoto);
        }

        // Append other form data fields
        for (const key in otherData) {
            formData.append(key, otherData[key]);
        }
        this.setState({ submitted: true });
    };

    handleSecondSubmit = async () => {
        const { cv, profilePhoto, ...otherData } = this.state;
        const formData = new FormData();

        if (cv) {
            formData.append('cv', cv);
        }
        if (profilePhoto) {
            formData.append('profilePhoto', profilePhoto);
        }

        // Append other form data fields
        for (const key in otherData) {
            formData.append(key, otherData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/employee/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            
            if (response.status === 201) {
                const id = response.data.id;
                this.setState({ submitted: true });
                window.location.href = `/employee/view/${id}`;
            } else {
                console.error('Error creating profile:', response.data);
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleFileChange = (event) => {
        const { id, files } = event.target;
        this.setState({ [id]: files[0] });
    };


    render() {
        const { submitted, cv, profilePhoto } = this.state;

        // Check if the form has been submitted, if so, display the success message and the CV and profile photo fields
        if (submitted) {
            return (
                <div className="create-profile-bg-container">
                    <div className="create-profile-form-container">
                        <h1>Upload your CV and profile photo:</h1>
            
                        <div className="field-row">
                            <div className="field">
                                <label htmlFor="cv">Upload CV (PDF or DOCX):</label>
                                <input
                                    type="file"
                                    id="cv"
                                    accept=".pdf,.doc,.docx"
                                    onChange={this.handleFileChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="profilePhoto">Upload Profile Photo (JPEG or PNG):</label>
                                <input
                                    type="file"
                                    id="profilePhoto"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={this.handleFileChange}
                                />
                            </div>
                        </div>
            
                        <button onClick={() => this.setState({ submitted: false })}>Return</button>
                        <button onClick={this.handleSecondSubmit}>Submit</button>            
                    </div>
                </div>
            );
        }

        return (
            <div className="create-profile-bg-container">
                <Link to="/home">
                    <button className="Home-button">HiringGame!</button>
                </Link>
                <div className="create-profile-form-container">
                    <h1>Create Your Profile</h1>
    
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" onChange={this.handleChange} />
                        </div>
    
                        <div className="field">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" onChange={this.handleChange} />
                        </div>
                    </div>
    
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" onChange={this.handleChange} />
                        </div>
    
                        <div className="field">
                            <label htmlFor="phone">Phone:</label>
                            <input type="tel" id="phone" onChange={this.handleChange} />
                        </div>
                    </div>
    
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="linkedin">LinkedIn Profile:</label>
                            <input type="url" id="linkedin" onChange={this.handleChange} />
                        </div>
    
                        <div className="field">
                            <label htmlFor="git">Git Profile:</label>
                            <input type="url" id="git" onChange={this.handleChange} />
                        </div>
                    </div>
    
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="category">Work Category:</label>
                            <select id="category" onChange={this.handleChange}>
                                <option value="Category 1">Category 1</option>
                                <option value="Category 2">Category 2</option>
                                <option value="Category 3">Category 3</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>
    
                        <div className="field">
                            <label htmlFor="jobTitle">Job Title:</label>
                            <select id="jobTitle" onChange={this.handleChange}>
                                <option value="Job Title 1">Job Title 1</option>
                                <option value="Job Title 2">Job Title 2</option>
                                <option value="Job Title 3">Job Title 3</option>
                                {/* Add more job titles as needed */}
                            </select>
                        </div>
                    </div>
    
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="experience">Experience:</label>
                            <select id="experience" onChange={this.handleChange}>
                                <option value="0">0</option>
                                <option value="<2 years">{'< 2 years'}</option>
                                <option value="<5 years">{'< 5 years'}</option>
                                <option value=">5 years">{'> 5 years'}</option>
                            </select>
                        </div>
    
                        <div className="field">
                            <label htmlFor="workType">Work Type:</label>
                            <select id="workType" onChange={this.handleChange}>
                                <option value="Remote">Remote</option>
                                <option value="Not Remote">Not Remote</option>
                            </select>
                        </div>
                    </div>

                    <div className="field-row">
                    {this.state.workType === "Not Remote" && (
                            <div className="field">
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" onChange={this.handleChange} />
                            </div>
                    )}

                    {this.state.workType === "Not Remote" && (
                            <div className="field">
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" onChange={this.handleChange} />
                            </div>
                    )}
                    </div>
    
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="situation">Current Situation:</label>
                            <select id="situation" onChange={this.handleChange}>
                                <option value="Employed">Employed</option>
                                <option value="Not Employed">Not Employed</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="languages">Languages:</label>
                            <select id="language" onChange={this.handleChange}>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Spanish">Spanish</option>
                                {/* Add more languages as needed */}
                            </select>
                        </div>
                    </div>
    
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}
