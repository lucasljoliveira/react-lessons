import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {onConfirm();}, TIMER);

    // When we return a function inside useEffect it will be called to cleanup after the function is called. 
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]); 
  // useEffect must have a list as second parameter with all the functions received on the main function and called inside the useEffect (if it use any), 
  // to avoid it to loop the function received must be declared with useCallback, so the function wont be recreated on every page refresh and will not cause loop here.

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <p>Automatic confirming: </p><ProgressBar timer={TIMER}/>
    </div>
  );
}
