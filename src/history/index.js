import {history} from 'backbone';
import React from 'react';
import {browserHistory, Link} from 'react-router';

function navigate(url) {
    browserHistory.push(url);
}

function goBack() {
    browserHistory.goBack();
}

export default {
    navigate,
    goBack,
    history,
    Link
}
