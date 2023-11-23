import { Link } from "react-router-dom";

export default function Page404() {
    return(
        <div class="d-flex flex-column align-items-center justify-content-center vh-100">
            <h1 class="mb-3">404 - Page Not Found</h1>
            <p class="text-muted fs-5">The page you are looking for does not exist</p>
            <Link to="/" class="text-dark etxt-decoration-none">Back to Home</Link>
        </div>
    )
}