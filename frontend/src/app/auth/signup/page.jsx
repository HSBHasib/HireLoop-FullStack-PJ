"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, TextField, Label } from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // Standard text schema payload target for BetterAuth pipeline
    console.log("SignUp Form Data Submitted successfully:", data);
  };

  const handleGoogleSignIn = () => {
    console.log("Redirecting to BetterAuth Google Social Provider workflow...");
  };




  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 py-14">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[440px] z-10 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create an account
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Join today to find your dream role
          </p>
        </div>

        {/* HeroUI Custom Form */}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4.5 w-full"
        >
          {/* Full Name Field */}
          <TextField isInvalid={!!errors.name} className="w-full">
            <Label className="text-zinc-300 text-sm font-medium mb-1">
              Full Name
            </Label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full h-10 px-3 bg-zinc-900/60 border border-zinc-800 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder:text-zinc-600 text-sm transition-colors"
              {...register("name", {
                required: "Name is required",
                validate: {
                  // Rule 1: No numbers or special characters allowed
                  onlyLetters: (value) =>
                    /^[A-Za-z\s]+$/.test(value) ||
                    "Name can only contain letters and spaces",

                  // Rule 2: Updated to verify character total length (at least 3 characters long)
                  minLengthThree: (value) =>
                    value.trim().length >= 3 ||
                    "Name must contain at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-danger-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </TextField>

          {/* Skip */}
          {/* Profile Image - Folder/Device Local Upload Option
          <TextField isInvalid={!!errors.image} className="w-full">
            <Label className="text-zinc-300 text-sm font-medium mb-1">
              Profile Image
            </Label>
            <div className="relative w-full">
              <input
                type="file"
                accept="image/*"
                className="w-full h-10 px-3 py-1.5 bg-zinc-900/60 border border-zinc-800 focus:border-purple-500 focus:outline-none rounded-xl text-zinc-400 text-sm transition-colors file:mr-4 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-purple-400 hover:file:bg-zinc-700 cursor-pointer"
                {...register("image", {
                  required: "Please select an image file from your device",
                })}
              />
            </div>
            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </TextField> */}

           {/* Profile Image URL Field */}
          <TextField isInvalid={!!errors.image} className="w-full">
            <Label className="text-zinc-300 text-sm font-medium mb-1">
              Profile Image URL
            </Label>
            <input
              type="url"
              placeholder="Image Url"
              className="w-full h-10 px-3 bg-zinc-900/60 border border-zinc-800 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder:text-zinc-600 text-sm transition-colors"
              {...register("image", {
                required: "Profile image reference URL is required",
              })}
            />
            {errors.image && (
              <p className="text-xs text-danger-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </TextField>

          {/* Email Address Field */}
          <TextField isInvalid={!!errors.email} className="w-full">
            <Label className="text-zinc-300 text-sm font-medium mb-1">
              Email Address
            </Label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full h-10 px-3 bg-zinc-900/60 border border-zinc-800 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder:text-zinc-600 text-sm transition-colors"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </TextField>

          {/* Password Specification Field */}
          <TextField isInvalid={!!errors.password} className="w-full relative">
            <Label className="text-zinc-300 text-sm font-medium mb-1">
              Password
            </Label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Your Password"
              className="w-full h-10 px-3 bg-zinc-900/60 border border-zinc-800 focus-border-purple-500 focus:outline-none rounded-xl text-white placeholder:text-zinc-600 text-sm transition-colors"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
            />

            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
              className="absolute right-2 top-8"
            >
              {isVisible ? (
                <IoIosEye className="size-4" />
              ) : (
                <IoIosEyeOff className="size-4" />
              )}
            </Button>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </TextField>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)]"
          >
            Create Account
          </Button>
        </Form>

        {/* Visual structural separator */}
        <div className="flex items-center my-5 w-full">
          <div className="flex-1 h-[1px] bg-zinc-800" />
          <span className="text-zinc-600 text-xs px-3 uppercase tracking-wider font-semibold">
            OR
          </span>
          <div className="flex-1 h-[1px] bg-zinc-800" />
        </div>

        {/* Google OAuth Provider integration trigger */}
        <Button
          type="button"
          onPress={handleGoogleSignIn}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800/80 transition-colors"
        >
          {/* React Icons FcGoogle Primitive */}
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </Button>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}


