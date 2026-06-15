import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin({ userData }));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-100 px-4">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-200 transition-all duration-300 hover:shadow-3xl">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h2>
                </div>
                {error && (
                    <p className="mt-6 text-center text-red-600">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className="mt-6 md:mt-10">
                    <div className="space-y-5">

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 rounded-xl border-slate-300 focus:border-indigo-500"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address",
                                },
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="h-12 rounded-xl border-slate-300 focus:border-indigo-500"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300"
                        >
                            Sign In
                        </Button>
                        <p className="mt-4 text-center text-slate-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>


                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;