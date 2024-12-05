import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, handleSubmit } from "../redux/actions/quizActions";
import { useLocation } from "react-router-dom";

// const Quiz = () => {
//   const { questions, currentPage, loading, error } = useSelector((state) => state.quiz);

//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [quizFeedback, setQuizFeedback] = useState(null);
//   const questionsPerPage = 1; // Number of questions per page

//   const currentQuestion = questions[(currentPage - 1) * questionsPerPage];

//   // Handle answer selection
//   const handleAnswerSelect = (questionId, option) => {
//     setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
//   };

//   // Submit the quiz
//   const handleSubmitQuiz = async () => {
//     if (Object.keys(selectedAnswers).length < questions.length) {
//       alert("Please answer all questions before submitting!");
//       return;
//     }

//     dispatch(handleSubmit(selectedAnswers, setQuizFeedback,dispatch));
//   };

//   if (loading) return <p>Loading questions...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="quiz-container">
//       <h1>Quiz</h1>

//       {currentQuestion && (
//         <div className="question-card" key={currentQuestion._id}>
//           <h3>{currentQuestion.question}</h3>
//           <div className="options">
//             {currentQuestion.options.map((option) => (
//               <label key={option}>
//                 <input
//                   type="radio"
//                   name={`question-${currentQuestion._id}`}
//                   value={option}
//                   checked={selectedAnswers[currentQuestion._id] === option}
//                   onChange={() => handleAnswerSelect(currentQuestion._id, option)}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="quiz-controls">
//         {currentPage > 1 && (
//           <button
//             onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage - 1 })}
//           >
//             Previous
//           </button>
//         )}

//         {currentPage < Math.ceil(questions.length / questionsPerPage) ? (
//           <button
//             onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage + 1 })}
//           >
//             Next
//           </button>
//         ) : (
//           <button onClick={handleSubmitQuiz}>Submit</button>
//         )}
//       </div>

//       {/* Display feedback after quiz submission */}
//       {quizFeedback && (
//         <div className="quiz-feedback">
//           <h2>Quiz Results</h2>
//           <p>Score: {quizFeedback.score}</p>
//           <div className="feedback-details">
//             {quizFeedback.feedback.map((item) => (
//               <div
//                 key={item.questionId}
//                 className={item.isCorrect ? "correct" : "incorrect"}
//               >
//                 <p>
//                   <strong>Question:</strong> {item.question}
//                 </p>
//                 <p>
//                   <strong>Your Answer:</strong> {item.userAnswer}{" "}
//                   {item.isCorrect ? "(Correct)" : "(Incorrect)"}
//                 </p>
//                 {!item.isCorrect && (
//                   <p>
//                     <strong>Correct Answer:</strong> {item.correctAnswer}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;



const Quiz = () => {
  const { questions, currentPage, loading, error } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const location = useLocation();
  const questionsPerPage = 1; // Number of questions per page
  const currentQuestion = questions[(currentPage - 1) * questionsPerPage];

  // State for the current page and selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState(null);



  useEffect(() => {
    if (location.state?.selectedTopics) {
      dispatch(fetchQuestions(location.state.selectedTopics));
    }
  }, [dispatch, location.state?.selectedTopics]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Submit the quizs
  const handleSubmitQuiz = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    dispatch(handleSubmit(selectedAnswers, setQuizFeedback, dispatch));
  };

  return (
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
            <button  onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage - 1 })} className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
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
                  className={`py-4 px-6 my-4 rounded-md ${item.isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
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
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default Quiz;