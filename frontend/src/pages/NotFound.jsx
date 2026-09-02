import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
    <p className="text-6xl mb-4">🏫</p>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h1>
    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
    <Link to="/login" className="text-primary-700 font-medium hover:underline">Go to login</Link>
  </div>
);

export default NotFound;
