import { calculateInvestmentResults, formatter } from '../util/investment.js'

export default function Result({ data }){
    let tableHead = (
        <thead>
            <tr className="center">
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
    )
    let tableBody = <></>
    if (data.initialInvestment && data.annualInvestment && data.expectedReturn && data.duration && data.duration > 0 ) {
        const resultData = calculateInvestmentResults(data)

        tableBody = (
            <tbody>
                {
                    resultData.map((yearData) => {
                        const totalInterest = yearData.valueEndOfYear - (data.initialInvestment + (data.annualInvestment * (yearData.year)))
                        const investedCapital = data.initialInvestment + (data.annualInvestment * (yearData.year))

                        return (
                            <tr key={yearData.year}>
                                <td>{yearData.year}</td>
                                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                                <td>{formatter.format(yearData.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(investedCapital)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }
    return (
        <table id="result">
            {tableHead}
            {tableBody}
        </table>
    )
}
