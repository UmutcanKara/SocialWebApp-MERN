import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null && alerts.length > 0
    ? alerts.map((alert) => {
        return (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        );
      })
    : null;

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};
export default connect(mapStateToProps)(Alert);
