import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import {
    I_MessengerListViewProps,
    I_GlobalState
} from "../../../interfaces";

const MessengerListView = (props: I_MessengerListViewProps) => {
    const {
        currentPage,
        triggerModalTopAlert
    } = props;

    return (
        <div>
            sadsad
        </div>
    )
}
const mapStateToProps = (gState: I_GlobalState) => ({
    currentPage: gState.navBar.currentPage
});

export default connect(mapStateToProps, {
    triggerModalTopAlert
})(MessengerListView);
