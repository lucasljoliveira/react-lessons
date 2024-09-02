import { useState } from "react"
import Result from "./components/Result.jsx"
import UserInput from "./components/UserInput.jsx"
import Header from "./components/Header.jsx"
import ErrorMessage from "./components/ErrorMessage.jsx"

function App() {
  const [userInputs, setUserInputs] = useState({
    initialInvestment: 10000,
    annualInvestment: 300,
    expectedReturn: 5.5,
    duration: 12,
  });

  const inputError = userInputs.duration <= 0;

  function handleUserInputs(field, value){
    setUserInputs((prevUserInputs) => {
      return {
        ...prevUserInputs,
        // [field]: Number(value)
        [field]: +value // the plus sign cast the value to number
      }
    })
  }

  return (
    <>
      <Header />
      <UserInput 
        userInputs={userInputs} 
        handleUserInputs={handleUserInputs}
      />
      <ErrorMessage show={inputError} />
      {!inputError && <Result data={userInputs} />}
    </>
  )
}

export default App
