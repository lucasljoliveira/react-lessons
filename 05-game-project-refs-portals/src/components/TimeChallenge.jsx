import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimeChallenge({ title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    
    const [timeRemaining, setTimeRemaining] = useState( targetTime * 1000 )
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }
    
    function handleReset() {
        setTimeRemaining( targetTime * 1000 );
    }

    function handleStartClick() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => (prevTimeRemaining - 10))
        }, 10) // 10 is the time that the inteval will call the function again
    }

    function handleEndClick() {
        dialog.current.open()
        clearInterval(timer.current)
    }

    return <>
        <ResultModal ref={dialog} onReset={handleReset} targetTime={targetTime} remainingTime={timeRemaining}></ResultModal>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' :''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleEndClick : handleStartClick}>
                    {timerIsActive ? "End " : "Start"} Challenge
                </button>
            </p>
            <p className={timerIsActive ? "active" : undefined}>
                {timerIsActive ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
    </>
}    