import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { hideToastMessage } from "../actions/imageActions.js";

const styles = theme => ({
})

class ToastMessage extends Component{
    constructor(props){
        super(props);
    }

    handleClose = () => {
        this.props.hideToastMessage();
    }

    render(){
        return(
            <Snackbar open={this.props.showToastMsg} autoHideDuration={10000} onClose={this.handleClose}>
                <MuiAlert onClose={this.handleClose} severity={this.props.severity}>
                    {this.props.message}
                </MuiAlert>
            </Snackbar>
        )
    }
}

const mapStateToProps = state => ({
    severity: state.ImageReducer.msgSeverity,
    showToastMsg: state.ImageReducer.showToastMsg,
    message: state.ImageReducer.message
});

const mapDispatchToProps = {
    hideToastMessage
};

const ToastMessageContainer = connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
export default withStyles(styles)(ToastMessageContainer);