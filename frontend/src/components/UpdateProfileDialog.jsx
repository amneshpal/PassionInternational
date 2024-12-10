

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    // Fallback to empty strings if user is not available
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null
    });

    const dispatch = useDispatch();

    // Handle text input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const { fullname, email, phoneNumber, bio, skills, file } = input;

        // Basic validation
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            toast.error('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("bio", bio);
        formData.append("skills", skills.split(",").map(skill => skill.trim()));
        if (file) {
            formData.append("file", file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            console.log('Response:', res);  // Debugging statement to log the response

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            } else {
                toast.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error:', error);  // Debugging statement to log the error
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }

        // Close the dialog after form submission
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        {/* Full Name Input */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="fullname" className="text-right">Name</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                required
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                required
                            />
                        </div>

                        {/* Bio Input */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                required
                            />
                        </div>

                        {/* Skills Input */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="Separate skills by comma"
                                required
                            />
                        </div>

                        {/* Resume File Input */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        {
                            loading ? (
                                <Button className="w-full my-4" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4">Update</Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
