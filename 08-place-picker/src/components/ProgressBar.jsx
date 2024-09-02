import { useEffect, useState } from "react";

// This ProgressBar was removed from DeleteConfirmation component so it not cause refresh of all 
// DeleteConfirmation component all the time because of the setInterval, and just the ProgressBar.
export default function ProgressBar({timer}) {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 10)
      }, 10);
      return () => {
        clearInterval(interval);
      };
    }, []);

    return <progress value={remainingTime} max={timer} />
};