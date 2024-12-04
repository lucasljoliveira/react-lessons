import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

export default function Error() {
    const error = useRouteError();

    let title = "An error occurred!";
    let message = "Something Went Wrong!";

    if (error.status === 500) {
        // We need to parse only if throw an error, if use json function it's not required
        // message = JSON.parse(error.data).message
        message = error.data.message
    }

    if (error.status === 400) {
        title = "Not Found!"
        message = "Could not find resource or page."
    }

    return <PageContent title={title}>
        <p>{message}</p>
    </PageContent>
}