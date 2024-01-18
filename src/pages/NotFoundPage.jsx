import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>It seems like the page you were trying to access does not exist</h1>
      <Link className="hover:underline" to="/">
        Go back home
      </Link>
    </>
  );
}

export default NotFoundPage;
