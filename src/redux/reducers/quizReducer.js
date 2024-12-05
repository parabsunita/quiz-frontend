const initialState = {
    questions: [],
    loading: false,
    error: null,
    responses: {},
    currentPage: 1,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_QUESTIONS_REQUEST":
            return { ...state, loading: true };
        case "FETCH_QUESTIONS_SUCCESS":
            return { ...state, loading: false, questions: action.payload };
        case "FETCH_QUESTIONS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "SAVE_RESPONSE":
            return {
                ...state,
                responses: {
                    ...state.responses,
                    [action.payload.questionId]: action.payload.selectedOption,
                },
            };
        case "SET_PAGE":
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export default quizReducer;
