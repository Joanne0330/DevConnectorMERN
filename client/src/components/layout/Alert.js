import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({ alerts }) =>  //the alerts is a prop which came from the bottom: 
    alerts !== null && 
    alerts.length > 0 && 
    alerts.map(alert => ( //mapping through alerts to get msg and id
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>  
            {alert.msg}
        </div>

    ));


Alert.propTypes = {
    alerts: PropTypes.array.isRequired //alert is the array of initial state array
}

//mapping the redux state (initial state array with objects) to a prop in this component for access
const mapStateToProps = state => ({
    alerts: state.alert    //getting alert from root reducer as state.alert, then set it as props called alerts
});

export default connect(mapStateToProps)(Alert);
//connecting with the state
