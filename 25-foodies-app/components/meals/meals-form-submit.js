'use client';

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit(){
    const status = useFormStatus(); // This function can only be used inside the form or in a component inside the form;

    return <button disabled={status.pending} >{status.pending ? "Submitting... ": "Share Meal"}</button>
}
