import * as FormActions from "../formcrud/form.action";

export const FormFeatureKey = "FormFeatureKey";

// Initial state
const initialState = {
    loading: false,
    error: '',
    studentList: [],
    student: {
        id: null,
        name: '',
        emailid: '',
        mobilenumber: ''
    }
};

export const formReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FormActions.CREATE_RECORD:
        case FormActions.UPDATE_RECORD:
            return {
                ...state,
                loading: false,
                studentList: state.studentList.map((student) =>
                    student.id === payload.id ? payload : student
                ),
            };

        case FormActions.DELETE_RECORD:
            return {
                ...state,
                loading: false,
                studentList: state.studentList.filter((student) => student.id !== payload),
            };

        case FormActions.FETCH_RECORD:
            return {
                ...state,
                loading: false,
                studentList: payload,
            };

        case FormActions.API_CALL_LOADING:
            return {
                ...state,
                loading: payload,
            };

        default:
            return state;
    }
};
