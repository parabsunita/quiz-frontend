import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, handleSubmit } from "../redux/actions/quizActions";
import { useLocation } from "react-router-dom";

const Quiz = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { questions, currentPage, loading, error } = useSelector((state) => state.quiz);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState(null);
  const questionsPerPage = 1; // Number of questions per page

  const currentQuestion = questions[(currentPage - 1) * questionsPerPage];

  // Fetch questions when the component loads
  useEffect(() => {
    if (location.state?.selectedTopics) {
      dispatch(fetchQuestions(location.state.selectedTopics));
    }
  }, [dispatch, location.state?.selectedTopics]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Submit the quiz
  const handleSubmitQuiz = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    dispatch(handleSubmit(selectedAnswers, setQuizFeedback,dispatch));
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      {currentQuestion && (
        <div className="question-card" key={currentQuestion._id}>
          <h3>{currentQuestion.question}</h3>
          <div className="options">
            {currentQuestion.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={option}
                  checked={selectedAnswers[currentQuestion._id] === option}
                  onChange={() => handleAnswerSelect(currentQuestion._id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="quiz-controls">
        {currentPage > 1 && (
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage - 1 })}
          >
            Previous
          </button>
        )}

        {currentPage < Math.ceil(questions.length / questionsPerPage) ? (
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage + 1 })}
          >
            Next
          </button>
        ) : (
          <button onClick={handleSubmitQuiz}>Submit</button>
        )}
      </div>

      {/* Display feedback after quiz submission */}
      {quizFeedback && (
        <div className="quiz-feedback">
          <h2>Quiz Results</h2>
          <p>Score: {quizFeedback.score}</p>
          <div className="feedback-details">
            {quizFeedback.feedback.map((item) => (
              <div
                key={item.questionId}
                className={item.isCorrect ? "correct" : "incorrect"}
              >
                <p>
                  <strong>Question:</strong> {item.question}
                </p>
                <p>
                  <strong>Your Answer:</strong> {item.userAnswer}{" "}
                  {item.isCorrect ? "(Correct)" : "(Incorrect)"}
                </p>
                {!item.isCorrect && (
                  <p>
                    <strong>Correct Answer:</strong> {item.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
