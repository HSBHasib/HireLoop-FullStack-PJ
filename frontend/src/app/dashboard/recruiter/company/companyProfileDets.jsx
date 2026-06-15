"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TextField, Label, Form } from "@heroui/react";
import toast from "react-hot-toast";

// React Icons
import {
  FiMapPin,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiChevronDown,
} from "react-icons/fi";

import { createCompanyFunc } from "@/lib/actions/companies";
import CompanyProfile from "@/components/dashboard/recruiter/CompanyProfile";
import CompanyRegisterCard from "@/components/dashboard/recruiter/CompanyRegisterCard";
import Image from "next/image";

const CompanyProfileDets = ({ recruiter, recruiterCompany }) => {
  // recruiter Id
  const recruiterId = recruiter?.id || "recruiterId Missing";

  const [loadingLogo, setLoadingLogo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  // Company Data
  const [company, setCompany] = useState(
    recruiterCompany || {
      registered: false,
      name: "",
      industry: "",
      website: "",
      location: "",
      employeeCount: "1-10",
      logoUrl: "",
      description: "",
      // status: company && company.status ? company.status : "Pending",
      status: "Pending",
    },
  );


  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      industry: "",
      website: "",
      location: "",
      employeeCount: "1-10",
      logoUrl: "",
      description: "",
    },
  });

  const currentLogoUrl = watch("logoUrl");

  const openFormModal = (mode, data = null) => {
    setModalMode(mode);
    if (mode === "edit" && data) {
      reset(data);
    } else {
      reset({
        name: "",
        industry: "",
        website: "",
        location: "",
        employeeCount: "1-10",
        logoUrl: "",
        description: "",
      });
    }
    setIsOpen(true);
  };

  // ImgBB Upload Flow
  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    setLoadingLogo(true);
    const formData = new FormData();
    formData.append("image", file);

    const companyLogo = process.env.NEXT_PUBLIC_Logo_API;

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${companyLogo}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Upload failed");
      }
      setValue("logoUrl", result.data.url);
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      toast.error(`Failed to upload logo: ${error.message}`);
    } finally {
      setLoadingLogo(false);
    }
  };

  const onSubmit = async (data) => {
    if (!data.logoUrl) {
      toast.error("Please upload a company logo.");
      return;
    }

    // Helper inside onSubmit to format url safely
    const rawWebsite = data.website?.trim();
    const formattedWebsite =
      rawWebsite &&
      !rawWebsite.startsWith("http://") &&
      !rawWebsite.startsWith("https://")
        ? `https://${rawWebsite}`
        : rawWebsite;

    const submittedData = {
      ...data,
      status: modalMode === "add" ? "Pending" : company.status,
    };

    const updatedCompany = {
      ...submittedData,
      recruiterId,
      registered: true,
    };

    try {
      // Pass Company Data on MongoDB
      const companyData = await createCompanyFunc(updatedCompany);

      if (companyData?.insertedId) {
        setCompany(updatedCompany);
        setIsOpen(false);

        toast.success(
          modalMode === "add"
            ? "Company registered configuration successful!"
            : "Company profile updated successfully!",
        );
      } else {
        toast.error("Failed to save changes into Database.");
      }
    } catch (err) {
      toast.error("Something went wrong processing standard actions.");
    }
  };

  // Status Badge Rendering Logic
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FiCheckCircle size={12} /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <FiXCircle size={12} /> Rejected
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FiAlertCircle size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-start p-6 pt-6">
      {/* If Company Didn't Registeded */}
      {!company.registered ? (
        <CompanyRegisterCard openFormModal={openFormModal} />
      ) : (
        <CompanyProfile
          company={company}
          openFormModal={openFormModal}
          getStatusBadge={getStatusBadge}
        />
      )}

      {/* Get Company Details */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-10">
          <Modal.Container>
            <Modal.Dialog className="max-w-2xl overflow-y-auto relative bg-[#0C0C0E] border border-zinc-800 rounded-2xl p-6">
              <Modal.CloseTrigger
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
              />

              <Modal.Header className="flex flex-col gap-1 border-b border-zinc-800/50 pb-5 mb-5">
                <Modal.Heading className="text-xl font-bold text-white tracking-wide">
                  {modalMode === "add"
                    ? "Register New Company"
                    : "Edit Company Profile"}
                </Modal.Heading>
                <p className="text-xs font-normal text-zinc-400 mt-1">
                  Enter your business details to start hiring on HireLoop.
                </p>
              </Modal.Header>

              <Modal.Body>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {/* Company Name */}
                    <TextField
                      isInvalid={!!errors.name}
                      className="w-full flex flex-col"
                    >
                      <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                        Company Name
                      </Label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        className="w-full h-10 px-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                        {...register("name", {
                          required: "Company name is mandatory",
                        })}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </TextField>

                    {/* Industry Select */}
                    <TextField
                      isInvalid={!!errors.industry}
                      className="w-full flex flex-col relative"
                    >
                      <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                        Industry / Category
                      </Label>
                      <div className="relative flex items-center w-full">
                        <select
                          className="w-full h-10 pl-3 pr-10 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white text-sm transition-colors appearance-none cursor-pointer"
                          {...register("industry", {
                            required:
                              "Industry category selection is mandatory",
                          })}
                        >
                          <option
                            value=""
                            disabled
                            className="bg-[#18181b] text-zinc-600"
                          >
                            Select Industry
                          </option>
                          <option value="Technology" className="bg-[#18181b]">
                            Technology
                          </option>
                          <option value="Finance" className="bg-[#18181b]">
                            Finance
                          </option>
                          <option value="Healthcare" className="bg-[#18181b]">
                            Healthcare
                          </option>
                          <option value="E-Commerce" className="bg-[#18181b]">
                            E-Commerce
                          </option>
                        </select>
                        <FiChevronDown
                          className="absolute right-3 text-zinc-500 pointer-events-none"
                          size={16}
                        />
                      </div>
                      {errors.industry && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.industry.message}
                        </p>
                      )}
                    </TextField>

                    {/* Website URL */}
                    <TextField className="w-full flex flex-col">
                      <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                        Website URL
                      </Label>
                      <div className="relative flex items-center w-full">
                        <input
                          type="text"
                          placeholder="https://www.company.com"
                          className="w-full h-10 px-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                          {...register("website")}
                        />
                      </div>
                    </TextField>

                    {/* Location */}
                    <TextField
                      isInvalid={!!errors.location}
                      className="w-full flex flex-col"
                    >
                      <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                        Location
                      </Label>
                      <div className="relative flex items-center w-full">
                        <FiMapPin
                          className="absolute left-3 text-zinc-500"
                          size={16}
                        />
                        <input
                          type="text"
                          placeholder="City, Country"
                          className="w-full h-10 pl-9 pr-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors"
                          {...register("location", {
                            required: "Location profile setup is mandatory",
                          })}
                        />
                      </div>
                      {errors.location && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </TextField>

                    {/* Employee Count Range */}
                    <TextField className="w-full flex flex-col relative">
                      <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                        Employee Count Range
                      </Label>
                      <div className="relative flex items-center w-full">
                        <select
                          className="w-full h-10 pl-3 pr-10 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white text-sm transition-colors appearance-none cursor-pointer"
                          {...register("employeeCount")}
                        >
                          <option value="1-10" className="bg-[#18181b]">
                            1-10 employees
                          </option>
                          <option value="11-50" className="bg-[#18181b]">
                            11-50 employees
                          </option>
                          <option value="51-200" className="bg-[#18181b]">
                            51-200 employees
                          </option>
                          <option value="201-500" className="bg-[#18181b]">
                            201-500 employees
                          </option>
                          <option value="500+" className="bg-[#18181b]">
                            500+ employees
                          </option>
                        </select>
                        <FiChevronDown
                          className="absolute right-3 text-zinc-500 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </TextField>

                    {/* Company Logo Upload Box */}
                    <TextField className="w-full flex flex-col">
                      <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                        Company Logo
                      </Label>
                      <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-900/40 rounded-xl p-2 h-10 w-full justify-between">
                        <div className="flex items-center gap-2 overflow-hidden max-w-[70%]">
                          {loadingLogo ? (
                            <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : currentLogoUrl ? (
                            <Image
                              src={currentLogoUrl}
                              alt="Preview"
                              width="200"
                              height="200"
                              className="w-6 h-6 rounded-md object-cover"
                            />
                          ) : (
                            <div className="p-1 bg-zinc-800 rounded-md text-zinc-400">
                              <FiUploadCloud size={12} />
                            </div>
                          )}
                          <span className="text-xs text-zinc-400 truncate">
                            {currentLogoUrl
                              ? "Logo Uploaded"
                              : "PNG, JPG up to 5MB"}
                          </span>
                        </div>

                        <label
                          htmlFor="logo-file-input"
                          className="h-7 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 min-w-[80px] rounded-lg flex items-center justify-center cursor-pointer px-2 transition-colors font-medium select-none"
                        >
                          {currentLogoUrl ? "Change" : "Upload image"}
                        </label>
                      </div>
                      <input
                        id="logo-file-input"
                        type="file"
                        onChange={handleImage}
                        accept="image/*"
                        className="hidden"
                      />
                    </TextField>
                  </div>

                  {/* Brief Description */}
                  <TextField
                    isInvalid={!!errors.description}
                    className="w-full flex flex-col"
                  >
                    <Label className="text-zinc-300 text-sm font-medium mb-1.5">
                      Job Details & Brief Description
                    </Label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the essence of this dynamic role vacancy overview..."
                      className="w-full p-3 bg-zinc-900/40 border border-zinc-800 focus:border-[#5850EC] focus:outline-none rounded-xl text-white placeholder:text-zinc-700 text-sm transition-colors resize-none"
                      {...register("description", {
                        required: "Description profile field is mandatory",
                      })}
                    />
                    {errors.description && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </TextField>

                  {/* Modal Footer with Action Buttons */}
                  <Modal.Footer className="pt-4 gap-3 flex justify-end w-full border-t border-zinc-800/50 mt-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-zinc-800 border border-transparent text-zinc-300 font-semibold px-5 py-2 text-sm rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-white text-black font-semibold px-5 py-2 text-sm hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
                    >
                      {modalMode === "add"
                        ? "Register Company"
                        : "Save Changes"}
                    </button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default CompanyProfileDets;
