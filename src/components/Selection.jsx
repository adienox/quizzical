import { useState } from 'react';
import { nanoid } from 'nanoid';

const Selection = ({
    setQuizData,
    setLoading,
    setSelected,
    setNoOfQuestions,
}) => {
    const initialData = {
        noOfQuestions: 5,
        category: 0,
        difficulty: 'none',
        type: 'none',
    };
    const [data, setData] = useState(initialData);

    // https://stackoverflow.com/a/7394787
    const decodeHTML = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    // https://stackoverflow.com/a/2450976
    const shuffleArray = (array) => {
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

    const updateData = (data) => {
        setQuizData(
            data.results.map((qData) => {
                const incorrect = qData.incorrect_answers.map((answer) => {
                    return {
                        value: decodeHTML(answer),
                        id: nanoid(),
                        isHeld: false,
                        isCorrect: false,
                    };
                });
                const correct = {
                    value: decodeHTML(qData.correct_answer),
                    id: nanoid(),
                    isHeld: false,
                    isCorrect: true,
                };
                const answersArray = shuffleArray([correct].concat(incorrect));
                return {
                    allAnswers: answersArray,
                    id: nanoid(),
                    question: decodeHTML(qData.question),
                };
            })
        );
    };

    const handleChange = (e) => {
        setData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setNoOfQuestions(data.noOfQuestions);
        let apiUrl = `https://opentdb.com/api.php?amount=${data.noOfQuestions}`;

        if (data.category !== '0') {
            apiUrl = apiUrl + `&category=${data.category}`;
        }
        if (data.difficulty !== 'none') {
            apiUrl = apiUrl + `&difficulty=${data.difficulty}`;
        }
        if (data.type !== 'none') {
            apiUrl = apiUrl + `&type=${data.type}`;
        }

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                updateData(data);
                setLoading(false);
            });

        setSelected(true);
    };

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="number"
                name="noOfQuestions"
                placeholder="Number of questions"
                className="flex__box"
                value={data.noOfQuestions}
                onChange={handleChange}
            />
            <select
                name="category"
                id="category"
                className="flex__box"
                value={data.category}
                onChange={handleChange}
            >
                <option value="0">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="29">Entertainment: Comics</option>
                <option value="31">
                    Entertainment: Japanese Anime & Manga
                </option>
                <option value="32">Entertainment: Cartoon & Animation</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="30">Science: Gadgets</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Arts</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
            </select>
            <select
                name="difficulty"
                id="difficulty"
                className="flex__box"
                value={data.difficulty}
                onChange={handleChange}
            >
                <option value="none">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <select
                name="type"
                id="type"
                className="flex__box"
                value={data.type}
                onChange={handleChange}
            >
                <option value="none">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
            </select>
            <button className="defaultButton">Start</button>
        </form>
    );
};

export default Selection;
