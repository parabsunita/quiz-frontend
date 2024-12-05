import { combineReducers } from "redux";
import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,   // Handles authentication-related state
  quiz: quizReducer,   // Handles quiz-related state
});

export default rootReducer;
