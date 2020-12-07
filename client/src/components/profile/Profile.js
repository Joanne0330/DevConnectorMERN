import React, {Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById, getProfiles } from '../../actions/profile';


const Profile = ({ 
    getProfileById, 
    profile: { profile, loading }, 
    auth, 
    match      //match is props.match for the url
}) => { 
    useEffect(() => {
        getProfileById(match.params.id)   //getting the id from url (props.match.params.id)
    }, [getProfiles]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : 
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to profiles
                    </Link>
                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && (
                        <Link to='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                        </Link>
                    )}
                </Fragment>
            }

        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth  //so that authorised user can edit his/her own profile, others can't
})

export default connect(mapStateToProps, { getProfileById })(Profile);
