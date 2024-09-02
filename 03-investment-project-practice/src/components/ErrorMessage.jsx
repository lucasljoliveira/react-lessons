export default function ErrorMessage({ show }) {
    let result = (<></>)
    if (show) {
        result = (<p className="center red">Durantion must be greater than zero (0)!</p>)
    }
    return result
}