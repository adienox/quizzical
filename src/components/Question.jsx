import React from 'react';
import { nanoid } from 'nanoid';

const Question = (props) => {
    const answerButtons = props.allAnswers.map((answer) => {
        const isDisabled = props.isShown ? true : false;

        let style = 'answer';
        if (answer.isHeld) {
            style = 'answer held';
        }

        if (props.isShown && answer.isCorrect) {
            style = 'answer correct';
        }

        if (props.isShown && answer.isHeld && !answer.isCorrect) {
            style = 'answer incorrect';
        }

        return (
            <button
                key={nanoid()}
                className={style}
                onClick={() => props.heldChange(props.qID, answer.id)}
                disabled={isDisabled}
            >
                {answer.value}
            </button>
        );
    });

    return (
        <div className="questionBlock">
            <h1 className="question">{props.question}</h1>
            {answerButtons}
            <hr />
        </div>
    );
};

export default Question;
