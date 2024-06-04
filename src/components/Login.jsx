import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";

export default function Login() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        console.log(data);
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                console.log(userData)
                if (userData) dispatch(authLogin(userData));
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
                    Login In
                </h2>

                <p className="text-center mt-2 text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-100 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="text-center text-red-600 mt-8">{error}</p>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="h-64 flex flex-col justify-between">
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    pattern: (value) =>
                                        /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim.test(value) || "Invalid email address"
                                },
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">Log in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
