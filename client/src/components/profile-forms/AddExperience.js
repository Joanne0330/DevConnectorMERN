import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'; // we're redirecting from actions file
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {  //passing in the actions and redirect
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false); // if current is true, then disable the 'to' field

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    return (
        <Fragment>
            <h1 class="large text-primary">Add An Experience</h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i>
                 Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form 
                class="form" 
                onSubmit={e => {
                    e.preventDefault();
                    addExperience(formData, history)
                }}>
                <div class="form-group">
                    <input 
                        type="text" 
                        placeholder="* Job Title" 
                        name="title" 
                        value={title}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div class="form-group">
                    <input 
                        type="text" 
                        placeholder="* Company" 
                        name="company" 
                        value={company}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div class="form-group">
                    <input 
                        type="text" 
                        placeholder="Location" 
                        name="location" 
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div class="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current" 
                            checked={current}  //checked atribute!
                            value={current} 
                            onChange={e => {   //if the checkbox is ticked:
                                setFormData({ ...formData, current: !current})   //setting current false => true
                                toggleDisabled(!toDateDisabled)    //setting toDateDisabled from false => true
                            }}
                        />{'  '}
                        Current Job
                    </p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input 
                        type="date" 
                        name="to"
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}  //if toDateDisabled turn true, then the status is 'disabled'
                    />
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={e => onChange(e)}
                    >
                    </textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
