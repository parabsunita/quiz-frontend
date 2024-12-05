import axios from "axios";

// Fetch questions
export const fetchQuestions = (topics) => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_QUESTIONS_REQUEST" });
        const token = localStorage.getItem("token");

        const response = await axios.get(
            `http://localhost:5000/api/questions/${topics[0]}`,
            {
                headers: {
                    Authorization: `${token}`, // Ensure token is valid and prefixed with 'Bearer '
                    "Content-Type": "application/json", // Optional but recommended
                },
            }
        );

        dispatch({
            type: "FETCH_QUESTIONS_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "FETCH_QUESTIONS_FAILURE",
            payload: error.response?.data?.message || "Error fetching questions",
        });
    }
};

// Save user responses
export const handleSubmit = async (selectedAnswers, setQuizFeedback,dispatch) => {
    if (Object.keys(selectedAnswers).length === 0) {
        alert("Please answer all questions before submitting.");
        return;
    }

    try {
        const token = localStorage.getItem("token"); // JWT for authentication
        const response = await axios.post(
            "http://localhost:5000/api/quizz/submit",
            { responses: selectedAnswers },
            {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json", // Optional but recommended
                },
            }
        );

        dispatch({
            type: "SUBMIT_QUIZ_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "SUBMIT_QUIZ_FAIL",
            payload: error.response?.data?.message || "Failed to submit quiz",
        });
    }
};

