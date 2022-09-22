import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';
import '../styles/questions.css';

const Questions = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [score, setScore] = useState(0);

    const questionElements = props.quizData.map((data) => {
        return (
            <Question
                key={nanoid()}
                question={data.question}
                allAnswers={data.allAnswers}
                qID={data.id}
                heldChange={props.heldChange}
                isShown={isShown}
            />
        );
    });

    const checkAnswer = () => {
        setIsShown(true);
        props.quizData.forEach((data) => {
            data.allAnswers.forEach((answer) => {
                if (answer.isHeld && answer.isCorrect) {
                    console.log(answer);
                    setScore((prevScore) => prevScore + 1);
                }
            });
        });
    };

    const handleClick = () => {
        if (isShown) {
            setIsShown(false);
            return props.resetQuiz();
        }
        return checkAnswer();
    };

    return (
        <div className="questionsBlock">
            {questionElements}
            <div className="buttonContainer">
                {isShown && (
                    <h4 className="score">
                        You scored {score}/5 correct answers
                    </h4>
                )}
                <button className="defaultButton" onClick={handleClick}>
                    {isShown ? 'Reset' : 'Check Answer'}
                </button>
            </div>
        </div>
    );
};

export default Questions;
