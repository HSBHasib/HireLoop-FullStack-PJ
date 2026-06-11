"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
  Button,
} from "@heroui/react";
import {
  HiUser,
  HiEnvelope,
  HiLink,
  HiPaperAirplane,
  HiDocumentText,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { createJobApplicationFunc } from "@/lib/actions/jobApplication";

const JobApplyForm = ({ job, applicant }) => {  
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: applicant?.name || "",
      email: applicant?.email || "",
      resumeLink: "",
      coverLetter: "",
    },
  });

  const onFormSubmit = async (data) => {
    const applicationPayload = { 
      jobId: job?._id,
      applicantImage: applicant?.image,
      companyId: job.companyId,
      companyName: job.companyName,
      ...data,
    };

    const res = await createJobApplicationFunc(applicationPayload);
    if (res.insertedId) {
      reset()
      toast.success(`Application submitted successful`);
    } else {
      toast.error("Something Went Wrong!", {
        duration: 1000,
      });
    }
  };

  return (
    <div className="bg-[#1E1E20]/40 border border-neutral-900 rounded-[24px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="mb-6 pb-4 border-b border-neutral-900">
        <h2 className="text-lg font-semibold text-white tracking-wide">
          Submit Your Application
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Please verify your details and attach your active portfolio document.
        </p>
      </div>

      {/* Form Component */}
      <Form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {/* Name Input with strict validation */}
        <TextField className="w-full" name="name">
          <Label className="text-xs text-neutral-400 font-medium mb-1 flex items-center gap-1.5">
            <HiUser className="text-neutral-500" /> Full Name
          </Label>
          <div
            className={`relative flex items-center w-full bg-[#111111] border rounded-xl px-3 h-12 transition-all focus-within:border-[#5850EC] ${errors.name ? "border-red-500/60" : "border-neutral-900"}`}
          >
            <Input
              {...register("name", {
                required: "Oops! core applicant name cannot be empty.",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              })}
              className="bg-transparent border-0 outline-none w-full text-neutral-200 text-sm focus:ring-0 focus:outline-none placeholder-neutral-600"
              placeholder="Enter your name"
            />
          </div>
          <Description className="text-[11px] text-neutral-600">
            Profile identity verified by account structure.
          </Description>
          {errors.name && (
            <FieldError className="text-xs text-red-500 mt-1 font-light">
              {errors.name.message}
            </FieldError>
          )}
        </TextField>

        {/* Email Input with format verification */}
        <TextField className="w-full" name="email">
          <Label className="text-xs text-neutral-400 font-medium mb-1 flex items-center gap-1.5">
            <HiEnvelope className="text-neutral-500" /> Email Address
          </Label>
          <div
            className={`relative flex items-center w-full bg-[#111111] border rounded-xl px-3 h-12 transition-all focus-within:border-[#5850EC] ${errors.email ? "border-red-500/60" : "border-neutral-900"}`}
          >
            <Input
              {...register("email", {
                required:
                  "Please insert a profile communications email destination.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:
                    "Please enter a valid email address (e.g., name@domain.com)",
                },
              })}
              className="bg-transparent border-0 outline-none w-full text-neutral-200 text-sm focus:ring-0 focus:outline-none placeholder-neutral-600"
              placeholder="Enter your email"
            />
          </div>

          {/* <p className="text-[11px] text-red-600 pl-2">Enter a valid email</p> */}
          <Description className="text-[11px] text-neutral-600">
            Enter a valid email address
          </Description>
          {errors.email && (
            <FieldError className="text-xs text-red-500 mt-1 font-light">
              {errors.email.message}
            </FieldError>
          )}
        </TextField>

        {/* Resume Input with strong URL validation */}
        <TextField isRequired className="w-full" name="resumeLink">
          <Label className="text-xs text-neutral-300 font-medium mb-1 flex items-center gap-1.5">
            <HiLink className="text-indigo-400" /> Resume Link{" "}
            <span className="text-red-500">*</span>
          </Label>
          <div
            className={`relative flex items-center w-full bg-[#151515] border rounded-xl px-3 h-12 transition-all focus-within:border-[#5850EC] ${errors.resumeLink ? "border-red-500/60" : "border-neutral-800"}`}
          >
            <Input
              placeholder="Enter your resume link"
              className="bg-transparent border-0 outline-none w-full text-white text-sm placeholder:text-neutral-600 focus:ring-0 focus:outline-none"
              {...register("resumeLink", {
                required: "You must provide a valid resume link to apply",
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                  message:
                    "Submission failed. Please enter a fully functional web URL",
                },
              })}
            />
          </div>
          <Description className="text-[11px] text-neutral-500">
            Provide a public link with access permission open.
          </Description>
          {errors.resumeLink && (
            <FieldError className="text-xs text-red-500 mt-1 font-light">
              {errors.resumeLink.message}
            </FieldError>
          )}
        </TextField>

        {/* Cover Letter Input with built-in maximum bounds check */}
        <div className="flex flex-col gap-1 w-full">
          <Label className="text-xs text-neutral-300 font-medium mb-1 flex items-center gap-1.5">
            <HiDocumentText className="text-indigo-400" /> Cover Letter{" "}
            <span className="text-neutral-500 text-[11px]">(Optional)</span>
          </Label>
          <Controller
            name="coverLetter"
            control={control}
            rules={{
              maxLength: {
                value: 1000,
                message: "Cover letter cannot exceed 1000 characters",
              },
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-1.5">
                <TextArea
                  {...field}
                  maxLength={800}
                  placeholder="Explain why you are an absolute perfect fit for this node backend engineer position..."
                  className="w-full bg-[#151515] border border-neutral-800 focus:border-[#5850EC] rounded-xl p-3 text-white/80 text-sm min-h-[140px] outline-none transition-all resize-none placeholder:text-neutral-600  leading-relaxed focus:ring-0 focus:outline-none"
                />
                <div className="flex justify-between items-center px-1">
                  {errors.coverLetter ? (
                    <span className="text-xs text-red-500 font-light">
                      {errors.coverLetter.message}
                    </span>
                  ) : (
                    <span className="text-[11px] text-neutral-500">
                      Keep it brief and impactful
                    </span>
                  )}
                  <Description className="text-[11px] text-neutral-500">
                    Characters: {field.value?.length || 0} / 800
                  </Description>
                </div>
              </div>
            )}
          />
        </div>

        {/* Submit Button Section */}
        <div className="pt-4 border-t border-neutral-900 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-6 rounded-xl bg-white/90 hover:bg-white/80 text-black font-semibold text-sm tracking-wide transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed"
          >
            <HiPaperAirplane
              className={`text-base ${isSubmitting ? "animate-pulse" : ""}`}
            />
            <span>
              {isSubmitting
                ? "Processing Application..."
                : "Submit Application"}
            </span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobApplyForm;
