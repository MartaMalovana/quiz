import { useNavigate } from 'react-router-dom';

export default function Finish({ quizAnsw, correctAnsw, quizTime }) {
    const navigate = useNavigate();
    console.log(quizTime)
    return (
        <div className="container finish">
            <h1>Finish!</h1>
            <p>Your answered <span className="title">  {quizAnsw} </span>questions</p>
            <p>Your correct answers:  <span className="title"> {correctAnsw} </span></p>
            <p>You have <span className="title"> {correctAnsw} </span> points</p>
            <p>Your quiz' time is <span className="title"> {Math.floor(quizTime / 1000)} </span> seconds</p>
            <button className="button-play" onClick={() => navigate("/")}>Play more!</button>
            <button className="button-stats" onClick={() => navigate("/stats")}>Show my statistics</button>
        </div>
    );
};