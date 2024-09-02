import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswer = useCallback(function handleSelectedAnswer(selectedAnswer) {
        setUserAnswers(prevUserAnswers => {
            return [
                ...prevUserAnswers,
                selectedAnswer
            ]
        });
    }, []);

    const onSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizIsComplete) {
        return <Summary
            userAnswers={userAnswers}
        />
    }

    return <div id="quiz" >
        <Question
            key={activeQuestionIndex}
            questionIndex={activeQuestionIndex}
            onSelectAnswer={handleSelectedAnswer}
            handleSkipAnswer={onSkipAnswer}
        />
    </div>
};