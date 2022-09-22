import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Start, Loading } from './components/Layovers';
import Questions from './components/Questions';
import './styles/app.css';

const App = () => {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameOn, setGameOn] = useState(false);
    const [resetQuiz, setResetQuiz] = useState(0);

    const handleClick = () => {
        setGameOn(true);
    };

    // https://stackoverflow.com/a/7394787
    const decodeHtml = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    // https://stackoverflow.com/a/2450976
    const shuffle = (array) => {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
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

    useEffect(() => {
        setLoading(true);
        fetch('https://opentdb.com/api.php?amount=5')
            .then((response) => response.json())
            .then((data) => {
                setQuizData(
                    data.results.map((qData) => {
                        const incorrect = qData.incorrect_answers.map(
                            (answer) => {
                                return {
                                    value: decodeHtml(answer),
                                    id: nanoid(),
                                    isHeld: false,
                                    isCorrect: false,
                                };
                            }
                        );
                        const correct = {
                            value: decodeHtml(qData.correct_answer),
                            id: nanoid(),
                            isHeld: false,
                            isCorrect: true,
                        };
                        const answersArray = shuffle(
                            [correct].concat(incorrect)
                        );
                        return {
                            allAnswers: answersArray,
                            id: nanoid(),
                            question: decodeHtml(qData.question),
                        };
                    })
                );
                setLoading(false);
            });
    }, [resetQuiz]);

    const handleResetQuiz = () => {
        setResetQuiz((prevState) => prevState + 1);
    };

    return (
        <main>
            {loading && <Loading />}
            {!loading && !gameOn && <Start onClick={handleClick} />}
            {!loading && gameOn && (
                <Questions
                    heldChange={heldChange}
                    resetQuiz={handleResetQuiz}
                    quizData={quizData}
                />
            )}
        </main>
    );
};

export default App;
