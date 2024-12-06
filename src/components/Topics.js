import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom"; 
import "./Topics.css";
import Footer from "./Footer";
import Spinner from "./Spinner";

const Topics = () => {
    const [loader,setLoader] =useState(false)
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [topics] = useState(["Math", "Science", "History", "Geography", "Programming"]);
    const navigate = useNavigate();

    // Handle topic selection
    const handleCheckboxChange = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    // Submit selected topics
    const handleSubmit = async () => {
        if (selectedTopics.length === 0) {
            alert("Please select at least one topic.");
            return;
        }

        setLoader(true)
        try {
            const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
            const response = await axios.post(
                "https://quizz-backend-app.onrender.com/api/topics/select",
                { topics: selectedTopics },
                {
                    headers: {
                        Authorization: `${token}`, // Ensure token is valid and prefixed with 'Bearer '
                        "Content-Type": "application/json", // Optional but recommended
                    },
                }
            );
            
         navigate('/quiz',{state:{selectedTopics:selectedTopics}});
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting topics:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
        {loader ?<Spinner/>:null}
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-sm rounded-[16px] pt-10 pb-12 px-[70px] max-w-[445px] w-full">
            <h2  className="text-3xl font-normal text-login-grey text-center mb-6">Select Topics</h2>
            <div className="text-left mb-5">
                {topics.map((topic) => (
                    <label
                    key={topic}
                   className="block text-lg  mb-4 text-login-grey"
                    >
                    <input
                        type="checkbox"
                        value={topic}
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleCheckboxChange(topic)}
                        className="form-checkbox h-4 w-4 mr-3  bg-gray-200 text-gray-600 border-gray-300 focus:ring-gray-600"
                    />
               <span
  className="font-semibold hover:underline hover:text-black"
  style={{ textDecorationColor: '#88C200' }} 
>
  {topic}
</span>




                    </label>
                ))}
                </div>

            <button
                onClick={handleSubmit}
               className="w-full bg-brand-green py-2 mt-5 rounded-lg hover:bg-brand-green-dark transition-colors text-login-grey"
            >
                Submit
            </button>
        </div>
        {/* <div className="flex ">
        <p className="p-3 border border-error-red text-error-red rounded-lg bg-lightred">
        <strong>Question:</strong> jhgfjdsh
        </p>
        <p className="p-3 border border-green-100 text-green-100 rounded-lg bg-lightgreen">
        <strong>Question:</strong> jhgfjdsh
        </p>
        </div> */}
        </div>
        
        <Footer />
        </>
    );
};

export default Topics;

