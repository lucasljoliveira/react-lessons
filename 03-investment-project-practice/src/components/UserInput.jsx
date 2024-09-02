export default function UserInput({ userInputs, handleUserInputs }) {
    return (
        <section id="user-input" >
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input 
                        type="number"
                        required
                        value={userInputs.initialInvestment}
                        onChange={(event) => (handleUserInputs("initialInvestment", event.target.value))}
                    />
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input 
                        type="number"
                        required
                        value={userInputs.annualInvestment}
                        onChange={(event) => (handleUserInputs("annualInvestment", event.target.value))}
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input 
                        type="number"
                        required
                        value={userInputs.expectedReturn}
                        onChange={(event) => (handleUserInputs("expectedReturn", event.target.value))}
                    />
                </p>
                <p>
                    <label>Duration</label>
                    <input 
                        type="number"
                        required
                        value={userInputs.duration}
                        onChange={(event) => (handleUserInputs("duration", event.target.value))}
                    />
                </p>
            </div>
        </section>
    )
}
