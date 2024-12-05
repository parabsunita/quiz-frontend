import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 

const Topics = () => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [topics] = useState(["Math", "Science", "History", "Geography", "Programming"]);
    const { user } = useSelector((state) => state.auth);
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

        try {
            const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
            const response = await axios.post(
                "http://localhost:5000/api/topics/select",
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
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Select Topics</h2>
            <div style={{ textAlign: "left" }}>
                {topics.map((topic) => (
                    <label key={topic} style={{ display: "block", margin: "10px 0" }}>
                        <input
                            type="checkbox"
                            value={topic}
                            checked={selectedTopics.includes(topic)}
                            onChange={() => handleCheckboxChange(topic)}
                        />
                        {topic}
                    </label>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default Topics;
