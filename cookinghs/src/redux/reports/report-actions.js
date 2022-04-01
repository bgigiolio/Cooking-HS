import * as ActionTypes from './report-types';
import { baseUrl } from '../../shared/baseUrl';

export const getReports = () => (dispatch) => {
    dispatch(reportsLoading(true));
    return fetch(baseUrl + 'api/reports', {
      credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
    .then(reports => dispatch(addReports(reports)))
    .catch(error => dispatch(failReports(error.message)))
}

export const reportsLoading = () => ({
    type: ActionTypes.REPORTS_LOADING
});

export const addReports = (reports) => ({
  type: ActionTypes.ADD_REPORTS,
  payload: reports
});

export const failReports = (errmess) => ({
    type: ActionTypes.REPORTS_FAILED,
    payload: errmess
});

export const addReport = (report) => ({
  type: ActionTypes.ADD_REPORT,
  payload: report
});

export const postReport = (report) => (dispatch) => {
  console.log(report)
  return fetch(baseUrl + 'api/reports', {
    method: "POST",
    body: JSON.stringify(report),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addReport(response)))
  .catch(error => { console.log('report creation', error.message); alert('Report could not be posted\nError: '+error.message); });
}

export const editReport = (report) => ({
  type: ActionTypes.EDIT_REPORT,
  payload: report
});

export const putReport = (_id, report) => (dispatch) => {
  const newReport = {
    ...report,
    _id: _id,
  };

  return fetch(baseUrl + 'api/reports/' + _id, {
    method: "PUT",
    body: JSON.stringify(newReport),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(editReport(response)))
  .catch(error => { console.log('report editing', error.message); alert('Report could not be edited\nError: '+error.message); });
}

export const delReport = (_id) => ({
  type: ActionTypes.DELETE_REPORT,
  payload: _id
});

export const deleteReport = (_id) => (dispatch) => {
  return fetch(baseUrl + 'api/reports/' + _id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => dispatch(delReport(_id)))
  .catch(error => { console.log('report deleting', error.message); alert('Report could not be deleted\nError: '+error.message); });
}