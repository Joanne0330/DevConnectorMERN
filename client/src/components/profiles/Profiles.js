import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {  //the action func and the destructured state
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            { loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop'></i> Brows and connect with developers
                    </p>
                    <div className='profiles'>
                        { profiles.length > 0 ? (
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />))
                        ) : <h4>No profiles found</h4>}
                    </div>
                </Fragment>
            }
        </Fragment>
    );   
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile  //the entire profile state from the root
})
export default connect(mapStateToProps, { getProfiles })(Profiles);