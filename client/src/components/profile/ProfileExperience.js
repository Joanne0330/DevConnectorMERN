import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ //experience is an array, but destructure the same way
    experience: { company, title, location, current, to, from, description }
}) => {
    return (
        <div>
          <h3 className="text-dark">{company}</h3>  
          <p>
              <Moment format='YYYY/DD/MM'>{from}</Moment> - { !to ? 'Now' : 
              <Moment format='YYYY/DD/MM'>{to}</Moment> }
          </p>
          <p>
              <strong>Position: </strong>{title}
          </p>
          <p>
              <strong>Description: </strong>{description}
          </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience
