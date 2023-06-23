import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

export default function Stats({ totalAnsw, correctAnsw, time, totalQuizPlayed }) {
    const navigate = useNavigate();

    const getMin = () => Math.floor(time / 60000);

    const getSec = () => Math.round(time / 1000) % 60;

    ChartJS.register(ArcElement, Tooltip, Legend);

    ChartJS.defaults.color = 'yellow';

    const data = {
        labels: ['Correct answers', 'Wrong answers'],
        datasets: [
            {
                label: 'answers',
                data: [correctAnsw, totalAnsw],
                backgroundColor: ['rgba(75, 192, 192, 0.9)', 'rgba(255, 99, 132, 0.9)'],
                borderColor: 'yellow',
            }
        ]
    };

    return (
        <div className="container stats">
            <h1 className="title">Hello, player!</h1>
            <p>You've played <span className="title"> {totalQuizPlayed} </span>quizzes</p>
            <p>You've answered <span className="title"> {totalAnsw} </span> questions</p>
            <p>Total quiz' time is <span className="title"> {getMin()} </span> minutes <span className="title"> {getSec()}</span>sec</p>
            <div>
                <Pie data={data} />
            </div>
            <button onClick={() => navigate("/")} className="cancel-quiz">Go to the Homepage</button>
        </div>
    );
};