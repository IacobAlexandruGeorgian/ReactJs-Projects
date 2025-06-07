import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from '../questions.js';

export default function Question({ index, onSelectedAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

    const [isAnswered, setIsAnswered] = useState(false);

    let timer = 10000;

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(selected) {
        if (isAnswered) return;

        setIsAnswered(true);
        setAnswer({
            selectedAnswer: selected,
            isCorrect: null,
        });

        setTimeout(() => {
            const isCorrect = QUESTIONS[index].answers[0] === selected;
            const newAnswer = {
                selectedAnswer: selected,
                isCorrect,
            };

            setAnswer(newAnswer);

            setTimeout(() => {
                onSelectedAnswer(newAnswer); // ✅ pass correct answer object
            }, 2000);
        }, 1000);

    }

    function handleTimeout() {
        if (isAnswered) return;
        setIsAnswered(true);
        onSkipAnswer();
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer key={timer} timeout={10000} onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState}/>
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}