import React from 'react';
import { Dna } from 'react-loader-spinner';
import '../styles/start.css';

const Start = (props) => {
    return (
        <div className="startContainer">
            <h1 className="title">Quizzical</h1>
            <h4 className="description">Test your trivia knowledge!</h4>
            <button className="defaultButton" onClick={props.onClick}>
                Start Quiz
            </button>
        </div>
    );
};

const Loading = () => {
    return (
        <>
            <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </>
    );
};

export { Start, Loading };
