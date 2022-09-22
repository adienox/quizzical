# Things to do

1. fetch data
2. display the data
3. change the state of the data based on click
4. check and validate the data
5. display the result and re run the steps

## Fetching the data

1. by using `fetch()` we can fetch the data

    ```json
    {
        "response_code": 0,
        "results": [
            {
                "category": "History",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Which of the following countries was the first to send an object into space?",
                "correct_answer": "Germany",
                "incorrect_answers": ["USA", "Russia", "China"]
            },
            {
                "category": "Entertainment: Cartoon & Animations",
                "type": "multiple",
                "difficulty": "hard",
                "question": "In &quot;Gravity Falls&quot;, what does Quentin Trembley do when he is driven out from the White House?",
                "correct_answer": "Eat a salamander and jump out the window.",
                "incorrect_answers": [
                    "Leave in peace.",
                    "Jump out the window.",
                    "Release 1,000 captive salamanders into the white house."
                ]
            },
            {
                "category": "Entertainment: Television",
                "type": "multiple",
                "difficulty": "medium",
                "question": "In Battlestar Galactica (2004), what is the name of the President of the Twelve Colonies?",
                "correct_answer": "Laura Roslin",
                "incorrect_answers": [
                    "William Adama",
                    "Tricia Helfer",
                    "Harry Stills"
                ]
            },
            {
                "category": "Entertainment: Film",
                "type": "multiple",
                "difficulty": "medium",
                "question": "What character in the Winnie the Pooh films was added by Disney and does not appear in the original books?",
                "correct_answer": "Gopher",
                "incorrect_answers": ["Tigger", "Heffalumps", "Rabbit"]
            },
            {
                "category": "Entertainment: Music",
                "type": "boolean",
                "difficulty": "easy",
                "question": "Lead Singer Rivers Cuomo of American rock band Weezer attended Harvard.",
                "correct_answer": "True",
                "incorrect_answers": ["False"]
            }
        ]
    }
    ```

2. the data returned is an **object**
3. the actual data that we want is inside **data.results**
4. **data.results** is an **array**
5. create a state _const [quizData, setQuizData] = useState([])_
6. use the state to set the data _setQuizData(() => {_
    1. map over data.results using _data.results.map(qData => {.._
        1. each array item contains yet another **object**
        2. there are three keys that we need **question, correct_answer, incorrect_answers**
            1. **question** is a **string**
            2. **correct_answer** is a **string**
            3. **incorrect_answers** is an **array**
        3. _const incorrect =_ map over the incorrect*answers using \_qData.incorrect_answers.map(answer => {..*
            1. each item is a **string**
            2. _value: answer_
            3. _id: nanoid()_
            4. _isHeld: false_
            5. _isCorrect: false_
            6. return the array
        4. _const correct =_ use the _qData.correct_answer_ to make an **object**
            1. _value: answer_
            2. _id: nanoid()_
            3. _isHeld: false_
            4. _isCorrect: true_
            5. return the object
        5. _const answersArray =_ join the _incorrect_ and _correct_ into a **single array**
        6. _allAnswers: answersArray_
        7. _id: nanoid()_
        8. _question: qData.question_
        9. return the object
7. _const questionElement =_ map over the quizData using _quizData.map(data => {.._ 1. return a _Question_ component 1. _key = {nanoid()}_ 2. _question = {data.question}_ 3. _allAnswers = {data.answersArray}_ 4. _qID = {data.id}_ ## Displaying the data 1. Create a _Question_ component 2. this component will get _props_ containing
    1. _question_
    2. _allAnswers_
    3. _qID_
3. _const answers =_ map over allAnswers using _props.allAnswers.map(answer => {.._
    1. check if the answer is held or not using _answer.isHeld_
    2. if held, set held style
    3. create a _button_ element with inner text of the answer
    4. return the _button_ element
4. return a _div_ containing the _question_ and the _answers_

## Change the state of data based on click

1. Create a _heldChange(qId, aId)_ function
2. use the state to set the data _setQuizData(prevQuizData => {.._
    1.
