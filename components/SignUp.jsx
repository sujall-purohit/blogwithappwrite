import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const [error, setError] = useState("");

    const signUp = async (data) => {
        setError("");

        try {
            const account = await authService.createAccount(data);

            if (account) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(login({ userData }));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-100 px-4">
           <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-200">




                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Create Account
                    </h2>
                </div>




                {/* Error */}
                {error && (
                    <p className="mt-6 text-center text-red-600">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(signUp)} className="mt-6 md:mt-10">
                    <div className="space-y-5">

                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="h-12 rounded-xl border-slate-300"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 rounded-xl border-slate-300"
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
                            placeholder="Create a password"
                            className="h-12 rounded-xl border-slate-300"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300"
                        >
                            Create Account
                        </Button>
                        <p className="mt-4 text-center text-slate-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;