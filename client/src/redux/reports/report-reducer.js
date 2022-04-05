import * as ActionTypes from './report-types';

export const ReportsReducer = (
    state = { 
        isLoading: true,
        errMess: null, 
        reports:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REPORTS:
            console.log("adding all reports")
            return {...state, isLoading: false, errMess: null, reports: action.payload};
        
        case ActionTypes.REPORTS_LOADING:
            return {...state, isLoading: true, errMess: null, reports: []}
        
        case ActionTypes.REPORTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_REPORT:
            alert("Created report successfully")
            const report = action.payload;
            return { ...state, reports: state.reports.concat(report)};

        case ActionTypes.EDIT_REPORT:
            alert("Edited report successfully")
            const editedreport = action.payload;
            return { ...state, reports: state.reports.filter((report) => report._id !== editedreport._id).concat(editedreport) }

        case ActionTypes.DELETE_REPORT:
            const reportid = action.payload;
            return { ...state, reports: state.reports.filter((report) => report._id !== reportid)};

        default:
            return state;
    }
};