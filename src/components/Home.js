import { useNavigate } from 'react-router-dom';
import quizzes from './quizzes.json';
import fetchQuestions from '../api/fetchQuestions';

export default function Home({ getData, clearAnsw, clearCorrectAnsw, quizTime, totalQuizPlayed }) {
    const navigate = useNavigate();

    const getQuestions = (url) => {
        // Sets "0" to answers amount of current quiz 
        clearAnsw();
        // Sets "0" to correct answers amount of current quiz 
        clearCorrectAnsw();
        // Adds +1 to played quizzes amount
        totalQuizPlayed();
        // Fetch for questions to db
        let promise = fetchQuestions(url);
        promise
            .then(({ results }) => {
                // Sets questions 
                getData(results);
                // Remembers the time when the last quiz started
                quizTime(Date.now());
                // Navigate to Play page
                navigate("/play");
            })
            .catch(error => console.log(error));
    };

    const randomQuiz = () => {
        // Gets random quiz index in quiz array and sets it to start quiz
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        getQuestions(quizzes[randomIndex].url);
    };

    return (
        <div className="container">
            <h1 className="title">DO YOU LIKE QUIZZES?<br />LET'S PLAY!</h1>
            <div className='quizzes'>
                {quizzes.map(el => <div className='quiz' key={el.id}>
                    <img className='quiz__image' src={require(`../images/${el.image}`)} alt="Quiz image" />
                    <p className='quiz__name'>{el.name}</p>
                    <p className='quiz__questions'>{el.questions} questions</p>
                    <button className='quiz__button' onClick={() => getQuestions(el.url)}>Play</button>
                </div>)}
            </div>
            <button className='quiz__lucky' onClick={randomQuiz}>I'm lucky</button>
        </div >
    );
};