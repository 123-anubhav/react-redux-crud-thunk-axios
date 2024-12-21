import { combineReducers } from "redux";
import * as FormReducer from "../formcrud/form.reducer";

let rootReducer = combineReducers({
    [FormReducer.FormFeatureKey]: FormReducer.formReducer
}
);
export { rootReducer };