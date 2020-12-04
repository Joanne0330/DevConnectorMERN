import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {  //like willMount and dismount with the action passed in
    useEffect(() => {
        getCurrentProfile();   //sent the action only once
    }, []);

    return (
        <div>
        Dashboard
        </div>
    )
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,    // from auth in the root
    profile: state.profile  //from profile in the root
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

