import { useState } from "react";

export default function useInput(defaultValue, validationFn){
    const [enteredValue, setenteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputOnBlur() {
        setDidEdit(true);
    }

    function handleChangeValue(event){
        setenteredValue(event.target.value);
        setDidEdit(false); 
    };

    return {
        value: enteredValue,
        handleInputChange: handleChangeValue,
        handleInputBlur: handleInputOnBlur,
        hasError: didEdit && !valueIsValid
    }
}