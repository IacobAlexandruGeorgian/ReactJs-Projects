import { useState, useCallback, useRef } from "react"

import QUESTIONS from '../questions.js'

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });

    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers}/>
        
    }

    return (
        <div id="quiz">
            <div id="question">
                <Question 
                    key={activeQuestionIndex}
                    index={activeQuestionIndex}
                    onSelectedAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}
                />
            </div>
        </div>

    )
}