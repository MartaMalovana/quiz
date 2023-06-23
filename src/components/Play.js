import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Play({ data, getAnsw, getCorrectAnsw, getTime }) {
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Adds correct answer to incorrect answers array to random place
        const quantity = data[question].incorrect_answers.length;
        const randomIndex = Math.floor(Math.random() * quantity);
        const allAnsw = [...data[question].incorrect_answers];
        allAnsw.splice(randomIndex, 0, data[question].correct_answer);
        setAnswers(allAnsw);
    }, [question]);

    const handleAnswer = (e) => {
        // Counts answers
        getAnsw();
        // Counts correct answers
        if (e.target.name === data[question].correct_answer) {
            getCorrectAnsw();
        };
        // Navigates to next question or to Finish page
        if ((question + 1) < data.length) {
            setQuestion(question + 1);
        } else {
            // Gets the finish time of last quiz
            getTime(Date.now());
            navigate("/finish");
        };
    };

    const cancelQuiz = () => {
        // Navigates to Home page
        navigate("/");
    }

    return (
        <div className="container">
            <h1 className="title">Question {question + 1}</h1>
            <p className="question">{data[question].question}</p>
            {answers.length !== 0 && answers.map(el =>
                <button className="answer" name={el} onClick={handleAnswer} key={Math.floor(Math.random() * 1000)}>{el}</button>
            )}
            <button className="cancel-quiz" onClick={cancelQuiz}>Cancel this quiz and go to the Homepage</button>
        </div>
    );
};