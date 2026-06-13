"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, TextField, Label } from "@heroui/react";
import { LuMapPin, LuCalendar, LuClock, LuBuilding2, LuTriangleAlert } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { newJobsFunc } from "@/lib/actions/newJob";
import { redirect } from "next/navigation";


const NewJobs = ({ company }) => {
  console.log('company data on create JOB page - ', company)

  // CompanyData
  const companyData = {
    companyId: company?._id,
    companyLogo: company?.logoUrl,
    companyName: company?.name,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "Technology",
      type: "Full-time",
      minSalary: "",
      maxSalary: "",
      currency: "USD",
      location: "",
      deadline: "",
      description: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      ...companyData,
      status: "active",
    };
    const res = await newJobsFunc(formData);

    if (res.insertedId) {
      reset();
      toast.success("Job posted successfully!");
    } else {
      toast.error("Something Went Wrong!", {
        duration: 1500,
      });
    }

    // Redirect to recruiter dashboard route after succeefully form submition.
    redirect("/dashboard/recruiter/jobs");
  };
  return (
    <div className="h-full bg-black text-white p-6 md:p-10 flex items-center justify-center select-none">
      {/* Container holding layout specs from your design image */}
      <div className="w-full max-w-185 bg-[#0A0A0A] border border-zinc-900 rounded-2xl shadow-2xl overflow-hidden p-8 relative">
        
        {/* Header Block Section */} 
        <div className="border-b border-zinc-900 pb-5 mb-6">
          <h1 className="text-xl font-bold tracking-wide text-zinc-100">
            Create New Job Position
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Enter details to dispatch active job vacancies on HireLoop.
          </p>
        </div>

        {/* 🛠️ Conditional Rendering Based on Company Status */}
        {company?.status !== "Approved" ? (
          <div className="flex flex-col items-center justify-center p-8 my-4 bg-[#0e0e10] border border-zinc-900 rounded-2xl min-h-87.5 text-center animate-fadeIn">
            
            <div className="relative flex items-center justify-center w-16 h-16 mb-5 rounded-2xl border bg-zinc-900/40 shadow-inner">
              {company?.status === "Rejected" ? (
                <div className="text-rose-500">
                  <LuTriangleAlert size={28} />
                </div>
              ) : (
                <div className="text-amber-500 animate-pulse">
                  <LuClock size={28} />
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400">
                <LuBuilding2 size={10} />
              </span>
            </div>

            <h3 className="text-base font-semibold text-zinc-200 mb-2">
              {company?.status === "Rejected" 
                ? "Company Verification Declined" 
                : "Verification Under Review"}
            </h3>
            
            <p className="text-xs text-zinc-500 max-w-md leading-relaxed mb-6">
              {company?.status === "Rejected"
                ? "We regret to inform you that your company profile details did not meet our verification criteria. Please review your company profile documentation or contact our admin support to appeal this decision."
                : "Your company profile is currently undergoing an official security review by our admin team. To maintain job marketplace integrity, you will be able to dispatch new job vacancies immediately once approved."}
            </p>

            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 px-4 py-2 rounded-xl">
              <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Current Status:</span>
              <span className={`h-2 w-2 rounded-full ${company?.status === 'Rejected' ? 'bg-rose-500' : 'bg-amber-500'}`} />
              <span className={`text-xs font-bold capitalize ${company?.status === 'Rejected' ? 'text-rose-400' : 'text-amber-400'}`}>
                {company?.status || "Pending"}
              </span>
            </div>
            
          </div>
        ) : (
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full"
          >
            {/* Row 1: Title and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <TextField isInvalid={!!errors.title} className="w-full">
                <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                  Job Title
                </Label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full h-10 px-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                  {...register("title", {
                    required: "Job title definition mandatory",
                  })}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </TextField>

              <TextField isInvalid={!!errors.category} className="w-full">
                <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                  Job Category
                </Label>
                <select
                  className="w-full h-10 px-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white text-sm transition-colors cursor-pointer appearance-none"
                  {...register("category")}
                >
                  <option value="Technology" className="bg-[#0A0A0A]">Technology</option>
                  <option value="Design" className="bg-[#0A0A0A]">Design</option>
                  <option value="Marketing" className="bg-[#0A0A0A]">Marketing</option>
                  <option value="Management" className="bg-[#0A0A0A]">Management</option>
                  <option value="Healthcare" className="bg-[#0A0A0A]">Healthcare</option>
                </select>
              </TextField>
            </div>

            {/* Row 2: Job Type and Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <TextField isInvalid={!!errors.type} className="w-full">
                <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                  Job Type
                </Label>
                <select
                  className="w-full h-10 px-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white text-sm transition-colors cursor-pointer appearance-none"
                  {...register("type")}
                >
                  <option value="Full-time" className="bg-[#0A0A0A]">Full-time</option>
                  <option value="Part-time" className="bg-[#0A0A0A]">Part-time</option>
                  <option value="Remote" className="bg-[#0A0A0A]">Remote</option>
                  <option value="Contract" className="bg-[#0A0A0A]">Contract</option>
                </select>
              </TextField>

              {/* Multi-Segment Structured Salary Matrix Field Grid Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <TextField isInvalid={!!errors.minSalary} className="w-full">
                  <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                    Min Salary
                  </Label>
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 80,000"
                      className="w-full h-10 pl-2 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                      {...register("minSalary", {
                        required: "Minimum salary entry required",
                        pattern: {
                          value: /^[0-9,]+$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                    />
                  </div>
                  {errors.minSalary && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.minSalary.message}
                    </p>
                  )}
                </TextField>

                <TextField isInvalid={!!errors.maxSalary} className="w-full">
                  <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                    Max Salary
                  </Label>
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 110,000"
                      className="w-full h-10 pl-2 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                      {...register("maxSalary", {
                        required: "Maximum salary entry required",
                        pattern: {
                          value: /^[0-9,]+$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                    />
                  </div>
                  {errors.maxSalary && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.maxSalary.message}
                    </p>
                  )}
                </TextField>

                <TextField isInvalid={!!errors.currency} className="w-full">
                  <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                    Currency
                  </Label>
                  <select
                    className="w-full h-10 px-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white text-sm transition-colors cursor-pointer appearance-none"
                    {...register("currency", {
                      required: "Please pick an exchange currency target",
                    })}
                  >
                    <option value="USD" className="bg-[#0A0A0A]">USD ($)</option>
                    <option value="BDT" className="bg-[#0A0A0A]">BDT (৳)</option>
                    <option value="EUR" className="bg-[#0A0A0A]">EUR (€)</option>
                    <option value="GBP" className="bg-[#0A0A0A]">GBP (£)</option>
                  </select>
                  {errors.currency && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.currency.message}
                    </p>
                  )}
                </TextField>
              </div>
            </div>

            {/* Row 3: Location and Application Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <TextField isInvalid={!!errors.location} className="w-full">
                <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                  Location
                </Label>
                <div className="relative flex items-center w-full">
                  <LuMapPin className="absolute left-3 text-zinc-600 size-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    className="w-full h-10 pl-9 pr-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                    {...register("location", {
                      required: "Job location metric mandatory",
                    })}
                  />
                </div>
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.location.message}
                  </p>
                )}
              </TextField>

              <TextField isInvalid={!!errors.deadline} className="w-full">
                <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                  Application Deadline
                </Label>
                <div className="relative flex items-center w-full">
                  <LuCalendar className="absolute left-3 text-zinc-600 size-4 pointer-events-none" />
                  <input
                    type="date"
                    className="w-full h-10 pl-9 pr-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors cursor-pointer scheme-dark"
                    {...register("deadline", {
                      required: "Please select deadline timeline target",
                    })}
                  />
                </div>
                {errors.deadline && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.deadline.message}
                  </p>
                )}
              </TextField>
            </div>

            {/* Block 4: Brief Job Description Area */}
            <TextField isInvalid={!!errors.description} className="w-full">
              <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                Job Details & Brief Description
              </Label>
              <textarea
                rows={3}
                placeholder="Tell us about the essence of this dynamic role vacancy overview..."
                className="w-full p-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors resize-none"
                {...register("description", {
                  required: "Description overview profile mandatory",
                })}
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </TextField>

            {/* Block 5: Technical Responsibilities Specifications */}
            <TextField isInvalid={!!errors.responsibilities} className="w-full">
              <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                Responsibilities
              </Label>
              <textarea
                rows={3}
                placeholder="List out core day-to-day operations and workflow execution tasks..."
                className="w-full p-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors resize-none"
                {...register("responsibilities", {
                  required: "Core task lists specifications required",
                })}
              />
              {errors.responsibilities && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.responsibilities.message}
                </p>
              )}
            </TextField>

            {/* Block 6: Core Requirements Checklist */}
            <TextField isInvalid={!!errors.requirements} className="w-full">
              <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                Requirements
              </Label>
              <textarea
                rows={3}
                placeholder="Enter technical skill expectations, experience boundaries and credentials..."
                className="w-full p-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors resize-none"
                {...register("requirements", {
                  required: "Required skills fields cannot remain empty",
                })}
              />
              {errors.requirements && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.requirements.message}
                </p>
              )}
            </TextField>

            {/* Block 7: Optional Benefits Context */}
            <TextField isInvalid={!!errors.benefits} className="w-full">
              <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                Benefits{" "}
                <span className="text-zinc-600 text-xs font-normal">
                  (Optional)
                </span>
              </Label>
              <textarea
                rows={2}
                placeholder="e.g. Full health insurance, Remote stipend, Unlimited PTO allocations..."
                className="w-full p-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors resize-none"
                {...register("benefits")}
              />
            </TextField>

            {/* Action Trigger Buttons Footer */}
            <div className="border-t border-zinc-900 pt-5 mt-2 flex justify-end items-center gap-3 w-full">
              <Button
                type="button"
                variant="light"
                className="px-5 h-10 rounded-xl text-zinc-400 border border-transparent hover:bg-zinc-900 hover:text-white transition-all text-sm font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="px-6 h-10 bg-[#5850EC] hover:bg-[#5850EC]/90 text-white font-semibold rounded-xl transition-all shadow-[0_0_25px_rgba(88,80,236,0.25)] text-sm"
              >
                Post Job Position
              </Button>
            </div>
          </Form>
        )}
        
      </div>
    </div>


  );
};

export default NewJobs;
