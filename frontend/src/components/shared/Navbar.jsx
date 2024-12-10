
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoError, setLogoError] = useState(false);  // State to track image error

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    // Handle image error to hide the logo
    const handleLogoError = () => {
        setLogoError(true);  // Set to true if image fails to load
    };

    return (
        <div className="bg-white shadow-md">
            {/* Desktop Navbar */}
            <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <div className="text-2xl font-semibold text-[#F83002]">
                        Passion<span className="text-[#6A38C2]">International</span>
                    </div>
                    {/* Only show the logo image if logoError is false */}
                    {!logoError && (
                        <img
                            src="Logo1.jpg"
                            className="ml-4 h-8"
                            onError={handleLogoError} // Set error handler
                            alt="Company Logo"
                        />
                    )}
                </div>

                <div className="flex items-center gap-12">
                    <ul className="hidden md:flex gap-6 font-medium">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="hover-text-primary transition-all">Companies</Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="hover-text-primary transition-all">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="hover-text-primary transition-all">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover-text-primary transition-all">About</Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="hover-text-primary transition-all">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="hover-text-primary transition-all">Browse</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover-text-primary transition-all">Contact</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="flex items-center gap-2">
                        {!user ? (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline" className="hover:bg-[#6A38C2] hover:text-white transition-all">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-all">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || "/default-avatar.jpg"}
                                            alt={user?.fullname}
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4 space-y-4">
                                    <div className="flex gap-3 items-center">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "/default-avatar.jpg"}
                                                alt={user?.fullname}
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium text-lg">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {user.role === 'student' && (
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link" className="text-red-500 hover:text-red-700">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden">
                <div className="flex justify-between items-center px-4 py-3">
                    <Link to="/" className="text-xl font-semibold text-[#F83002]">
                        Job<span className="text-[#6A38C2]">Portal</span>
                    </Link>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="text-[#6A38C2]">
                                Menu
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4">
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/" className="block text-gray-700 hover:text-[#6A38C2]">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="block text-gray-700 hover:text-[#6A38C2]">About</Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="block text-gray-700 hover:text-[#6A38C2]">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="block text-gray-700 hover:text-[#6A38C2]">Browse</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="block text-gray-700 hover:text-[#6A38C2]">Contact</Link>
                                </li>
                                {user && user.role === 'recruiter' && (
                                    <>
                                        <li>
                                            <Link to="/admin/companies" className="block text-gray-700 hover:text-[#6A38C2]">Companies</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/jobs" className="block text-gray-700 hover:text-[#6A38C2]">Jobs</Link>
                                        </li>
                                    </>
                                )}
                                {!user ? (
                                    <>
                                        <li>
                                            <Link to="/login" className="block text-gray-700 hover:text-[#6A38C2]">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/signup" className="block text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white">
                                                Signup
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="text-gray-700">
                                        <Button onClick={logoutHandler} className="block text-red-500 hover:text-red-700">
                                            Logout
                                        </Button>
                                    </li>
                                )}
                            </ul>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
