import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, handleSubmit } from "../redux/actions/quizActions";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";



const Quiz = () => {
  const { questions, currentPage } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const location = useLocation();
  const questionsPerPage = 1; // Number of questions per page
  const currentQuestion = questions[(currentPage - 1) * questionsPerPage];
  const navigate=useNavigate();

  // State for the current page and selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [loader, setLoader] = useState(false)


  useEffect(() => {

    if (location.state?.selectedTopics) {
      setLoader(true)
      dispatch(fetchQuestions(location.state.selectedTopics));
      setLoader(false)
    }
  }, [dispatch, location.state?.selectedTopics]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };
 const callTopics =()=>{

  navigate("/topics")
 }
  // Submit the quizs
  const handleSubmitQuiz = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    setLoader(true)

    dispatch(handleSubmit(selectedAnswers, setQuizFeedback, dispatch));
    setLoader(false)
  };

  return (
    <> 
    {loader?<Spinner/>:null}
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-sm rounded-[16px] pt-10 pb-12 px-[70px] max-w-[70%] w-full">
        <h1 className="text-3xl font-normal text-login-grey text-center mb-6">{quizFeedback ? " Quiz Result" : "Quiz"}</h1>

        {currentQuestion && !quizFeedback && (
          <div className="question-card" key={currentQuestion._id}>
            <h3 className="text-2xl font-normal text-login-grey mb-6">{currentQuestion.question}</h3>
            <div className="options space-y-3 mb-5">
              {currentQuestion.options.map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={option}
                    checked={selectedAnswers[currentQuestion._id] === option}
                    onChange={() => handleAnswerSelect(currentQuestion._id, option)}
                    className="form-radio h-5 w-5 text-brand-green-600 focus:ring-brand-green-500"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {quizFeedback ? null : (<div className="quiz-controls flex justify-between">
          {currentPage > 1 && (
            <button onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage - 1 })} className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
              Previous
            </button>
          )}

          {currentPage < Math.ceil(questions.length / questionsPerPage) ? (
            <button
              onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage + 1 })}
              className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          ) : (
            <div>            <button onClick={handleSubmitQuiz} className="w-full bg-brand-green py-2 px-4 rounded-lg hover:bg-brand-green-dark transition-colors text-login-grey">Submit</button>
            </div>)}
        </div>)}


        {/* Display feedback after quiz submission */}
        {quizFeedback && (
          <div className="quiz-feedback">
            <p className="text-lg">Score: {quizFeedback.score}</p>
            <div className="feedback-details mt-6">
              {quizFeedback.feedback.map((item) => (
                <div
                  key={item.questionId}
                  className={`py-4 px-6 my-4 rounded-md ${item.isCorrect ? "bg-green-100 text-green-600 success-green" : "bg-red-100 text-red-600"
                    }`}
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
              <div className="text-center" onClick={callTopics}>Back to Home</div>
            </div>
          </div>

        )}
      </div>
    </div></>
  );
};

export default Quiz;