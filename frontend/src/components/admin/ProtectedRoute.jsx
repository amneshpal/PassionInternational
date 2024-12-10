
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user data exists and if they have the required role
        if (user === null) {
            // Optionally, you could handle redirect for a logged-out user
            navigate("/");
        } else if (user.role !== 'recruiter') {
            // Redirect to home or another page if the user doesn't have the 'recruiter' role
            navigate("/");
        } else {
            // If the user is valid, stop loading
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        // Optionally, you could render a loading spinner or nothing until user data is verified
        return <div>Loading...</div>; // Placeholder for loading state
    }

    return <>{children}</>;
};

export default ProtectedRoute;
