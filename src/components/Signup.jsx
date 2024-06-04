import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Logo, Input, Button } from "./index";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounder-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-bold text-center text-2xl leading-tight">
                    Sign Up
                </h2>

                <p className="text-center mt-2 text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-100 hover:underline"
                    >
                        Login
                    </Link>
                </p>

                {error && (
                    <p className="text-center text-red-600 mt-8">{error}</p>
                )}

                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <div className="h-80 flex flex-col justify-between">
                        <Input
                            label="Name: "
                            placeholder="Enter you Full name"
                            type="text"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    pattern: (value) =>
                                        /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim.test(
                                            value
                                        ) || "Invalid email address",
                                },
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                // validate: {
                                //     pattern: (value) =>
                                //         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                                //             value
                                //         ) ||
                                //         "Password must be 8 characters long and should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                                // },
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
