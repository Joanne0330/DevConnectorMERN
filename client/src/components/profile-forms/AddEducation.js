import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom'; // we're redirecting from actions file
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {  //passing in the actions and redirect
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false); // if current is true, then disable the 'to' field

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    return (
        <Fragment>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i>
                 Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form 
                className="form" 
                onSubmit={e => {
                    e.preventDefault();
                    addEducation(formData, history)
                }}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* School or Bootcamp" 
                        name="school" 
                        value={school}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Degree or Certificate" 
                        name="degree" 
                        value={degree}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Field of Study" 
                        name="fieldofstudy" 
                        value={fieldofstudy}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
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
                        Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input 
                        type="date" 
                        name="to"
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}  //if toDateDisabled turn true, then the status is 'disabled'
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Programme Description"
                        value={description}
                        onChange={e => onChange(e)}
                    >
                    </textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
