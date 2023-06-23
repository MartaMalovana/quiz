import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Finish from './components/Finish';
import Stats from './components/Stats';

function App() {
  const [data, setData] = useState(null);
  const [quizAnsw, setQuizAnsw] = useState(0);
  const [totalAnsw, setTotalAnsw] = useState(0);
  const [quizCorrectAnsw, setQuizCorrectAnsw] = useState(0);
  const [correctAnsw, setCorrectAnsw] = useState(0);
  const [quizTime, setQuizTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalQuizPlayed, setTotalQuizPlayed] = useState(0);

  const handleData = (arr) => {
    setData(arr);
  };

  const handleTime = (time) => {
    // Sets time of last quiz
    setQuizTime(time - quizTime);
    // Sets total time of all quizzes including the last one
    setTotalTime(totalTime + time - quizTime);
  };

  const handleAnswer = () => {
    // Sets answers amount in the last quiz
    setQuizAnsw(quizAnsw + 1);
    // Sets total answers amount (of all quizzes)
    setTotalAnsw(totalAnsw + 1);
  };

  const handleCorrectAnswer = () => {
    // Sets correct answers amount in the last quiz
    setQuizCorrectAnsw(quizCorrectAnsw + 1);
    // Sets total correct answers amount (of all quizzes)
    setCorrectAnsw(correctAnsw + 1);
  };

  const getStartTime = (a) => {
    // Remembers the time when the last quiz started
    setQuizTime(a);
  }

  return (
    <Routes>
      <Route path="/" element={<Home getData={handleData} clearAnsw={() => setQuizAnsw(0)} clearCorrectAnsw={() => setQuizCorrectAnsw(0)} quizTime={getStartTime} totalQuizPlayed={() => setTotalQuizPlayed(totalQuizPlayed + 1)} />} />
      <Route path="/play" element={<Play data={data} getAnsw={handleAnswer} getCorrectAnsw={handleCorrectAnswer} getTime={handleTime} />} />
      <Route path="/finish" element={<Finish quizAnsw={quizAnsw} correctAnsw={quizCorrectAnsw} quizTime={quizTime} />} />
      <Route path="/stats" element={<Stats totalAnsw={totalAnsw} correctAnsw={correctAnsw} time={totalTime} totalQuizPlayed={totalQuizPlayed} />} />
    </Routes>
  );
}

export default App;
