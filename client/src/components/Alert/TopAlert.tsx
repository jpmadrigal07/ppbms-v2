import React from "react";
import { connect } from "react-redux";
import { Alert, Container } from "react-bootstrap";
import { I_TopAlertProps, I_GlobalState } from "../../interfaces";
import { triggerTopAlert } from "../../actions/topAlertActions";

const TopAlert = (props: I_TopAlertProps) => {
  const { type, showAlert, message, triggerTopAlert } = props;
  return (
    <Container>
      <Alert
        style={{ marginBottom: "15px" }}
        variant={type}
        show={showAlert}
        onClose={() => triggerTopAlert(false, "", "")}
        dismissible
      >
        {message}
      </Alert>
    </Container>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  showAlert: gState.topAlert.showAlert,
  message: gState.topAlert.message,
  type: gState.topAlert.type
});

export default connect(mapStateToProps, { triggerTopAlert })(TopAlert);