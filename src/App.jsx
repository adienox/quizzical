import { useState } from 'react';
import { Start, Loading } from './components/Layovers';
import Questions from './components/Questions';
import Selection from './components/Selection';

const App = () => {
    const [quizData, setQuizData] = useState([]);
    const [gameOn, setGameOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    const [noOfQuestions, setNoOfQuestions] = useState(5);

    const handleClick = () => {
        setGameOn(true);
    };

    const heldChange = (qID, aID) => {
        setQuizData((prevQuizData) => {
            return prevQuizData.map((question) => {
                if (question.id !== qID) {
                    return question;
                }
                const newAnswers = question.allAnswers.map((answer) => {
                    return answer.id === aID
                        ? { ...answer, isHeld: !answer.isHeld }
                        : { ...answer, isHeld: false };
                });
                return { ...question, allAnswers: newAnswers };
            });
        });
    };

    const handleResetQuiz = () => {
        setSelected(false);
    };

    return (
        <main className="grid">
            {loading && <Loading />}
            {!loading && !gameOn && <Start onClick={handleClick} />}
            {gameOn && !selected && (
                <Selection
                    setQuizData={setQuizData}
                    setLoading={setLoading}
                    setSelected={setSelected}
                    setNoOfQuestions={setNoOfQuestions}
                />
            )}
            {!loading && gameOn && selected && (
                <Questions
                    heldChange={heldChange}
                    resetQuiz={handleResetQuiz}
                    quizData={quizData}
                    noOfQuestions={noOfQuestions}
                />
            )}
        </main>
    );
};

export default App;
