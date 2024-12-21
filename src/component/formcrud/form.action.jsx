import Axios from "axios";

export const CREATE_RECORD = "CREATE_RECORD";
export const UPDATE_RECORD = "UPDATE_RECORD";
export const DELETE_RECORD = "DELETE_RECORD";
export const FETCH_RECORD = "FETCH_RECORD";

export const API_CALL_LOADING = "API_CALL_LOADING";
export const API_CALL_ERROR = "API_CALL_ERROR";

// Action creators
export const createRecord = (data) => ({
    type: CREATE_RECORD,
    payload: data,
});

export const updateRecord = (updatedData) => ({
    type: UPDATE_RECORD,
    payload: updatedData,
});

export const deleteRecord = (id) => ({
    type: DELETE_RECORD,
    payload: id,
});

export const fetchRecord = (data) => ({
    type: FETCH_RECORD,
    payload: data,
});

// API call actions
export const apiCallLoading = (isLoading) => ({
    type: API_CALL_LOADING,
    payload: isLoading,
});

export const apiCallError = (error) => ({
    type: API_CALL_ERROR,
    payload: error,
});

// Async Actions (Thunk for server communication)
const BASE_URL = "http://localhost:8080"; // Replace with your actual backend URL

export const fetchRecordsFromServer = () => async (dispatch) => {
    dispatch(apiCallLoading(true));
    try {
        const response = await Axios.get(`${BASE_URL}/get-Student`);
        dispatch(fetchRecord(response.data));
    } catch (error) {
        dispatch(apiCallError(error.message));
    } finally {
        dispatch(apiCallLoading(false));
    }
};

export const createRecordOnServer = (data) => async (dispatch) => {
    dispatch(apiCallLoading(true));
    try {
        const response = await Axios.post(`${BASE_URL}/create-Student`, data);
        dispatch(createRecord(response.data));
    } catch (error) {
        dispatch(apiCallError(error.message));
    } finally {
        dispatch(apiCallLoading(false));
    }
};

export const updateRecordOnServer = (data) => async (dispatch) => {
    dispatch(apiCallLoading(true));
    try {
        const response = await Axios.put(`${BASE_URL}/update-Student`, data);
        dispatch(updateRecord(response.data));
    } catch (error) {
        dispatch(apiCallError(error.message));
    } finally {
        dispatch(apiCallLoading(false));
    }
};

export const deleteRecordOnServer = (id) => async (dispatch) => {
    dispatch(apiCallLoading(true));
    try {
        await Axios.delete(`${BASE_URL}/delete-Student?id=${id}`);
        dispatch(deleteRecord(id));
    } catch (error) {
        dispatch(apiCallError(error.message));
    } finally {
        dispatch(apiCallLoading(false));
    }
};
