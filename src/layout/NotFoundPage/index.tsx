import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for might be somewhere else.</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}
