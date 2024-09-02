import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelectProp}) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    };

    return <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            let cssClasses = "";
            const isSelected = selectedAnswer === answer;
            if (answerState === "answered" && isSelected) {
                cssClasses = 'selected';
            };
            if ((answerState === "correct" || answerState === "wrong") && isSelected ) {
                cssClasses = answerState;
            };

            return <li key={answer} className="answer">
                <button 
                    onClick={() => onSelectProp(answer)}
                    className={cssClasses}
                    disabled={answerState !== ""}
                >{answer}</button>
            </li>
        })}
    </ul>
}