import React from "react";
import { Select, Label, Description, ListBox, } from "@heroui/react";
import {
  HiMagnifyingGlass,
  HiBriefcase,
  HiMapPin,
  HiOutlineFunnel,
  HiChevronDown,
} from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";


const SearchFilter = ({searchQuery, setSearchQuery, selectedLocation, setSelectedLocation, selectedType, setSelectedType, selectedCategory, setSelectedCategory }) => {

      // Reset All Search Queries
      const handleReset = () => {
        setSearchQuery("");
        setSelectedLocation("all");
        setSelectedType("all");
        setSelectedCategory("all");
      };

  return (
    <div className="w-full max-w-6xl bg-[#121212] border border-neutral-900 rounded-[28px] p-6 flex flex-col gap-5 shadow-2xl">
      {/* Search Input */}
      <div className="w-full flex items-center gap-3 bg-[#1c1a1e] px-4 rounded-2xl border border-neutral-800 focus-within:border-[#4F46E5] focus-within:ring-1 focus-within:ring-[#4F46E5] transition-all duration-200">
        <HiMagnifyingGlass className="text-xl text-neutral-500 shrink-0" />
        <input
          type="text"
          placeholder="Search by job title, company name...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-0 text-white placeholder:text-neutral-500 text-sm h-14 focus:outline-none"
        />
      </div>

      {/* Drop Down Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Location */}
        <div className="flex flex-col gap-1.5 w-full">
          <Select
            selectedKey={selectedLocation}
            onSelectionChange={(key) => setSelectedLocation(String(key || ""))}
          >
            <Label className="text-xs text-neutral-400 font-medium">
              Location
            </Label>
            <Select.Trigger className="w-full bg-[#1c1a1e] border border-neutral-800 rounded-xl h-12 px-3 text-neutral-200 text-sm flex items-center justify-between hover:bg-neutral-800 focus:border-[#4F46E5] outline-none transition-colors">
              <div className="flex items-center gap-2">
                <HiMapPin className="text-lg text-[#A5B4FC] shrink-0" />
                <Select.Value placeholder="Select Location" />
              </div>
              <Select.Indicator>
                <HiChevronDown className="text-neutral-500 text-xs" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-[#121212] border border-neutral-800 text-white rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1 outline-none">
                <ListBox.Item
                  id="all"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>All Location</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="remote"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Remote</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="dhaka"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Dhaka</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="chattogram"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Chattogram</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="sylhet"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Sylhet</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="gazipur"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Gazipur</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="international"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 text-indigo-400 font-semibold cursor-pointer outline-none"
                >
                  <Label>Outside Bangladesh</Label>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Job Type */}
        <div className="flex flex-col gap-1.5 w-full">
          <Select
            selectedKey={selectedType}
            onSelectionChange={(key) => setSelectedType(String(key || ""))}
          >
            <Label className="text-xs text-neutral-400 font-medium">
              Job Type
            </Label>
            <Select.Trigger className="w-full bg-[#1c1a1e] border border-neutral-800 rounded-xl h-12 px-3 text-neutral-200 text-sm flex items-center justify-between hover:bg-neutral-800 focus:border-[#4F46E5] outline-none transition-colors">
              <div className="flex items-center gap-2">
                <HiBriefcase className="text-lg text-[#A5B4FC] shrink-0" />
                <Select.Value placeholder="Job Type" />
              </div>
              <Select.Indicator>
                <HiChevronDown className="text-neutral-500 text-xs" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-[#121212] border border-neutral-800 text-white rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1 outline-none">
                <ListBox.Item
                  id="all"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>All Type</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Full-time"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Full-time</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Part-time"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Part-time</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Contract"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Contract</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Internship"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Internship</Label>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Job Category */}
        <div className="flex flex-col gap-1.5 w-full">
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(String(key || ""))}
          >
            <Label className="text-xs text-neutral-400 font-medium">
              Category
            </Label>
            <Select.Trigger className="w-full bg-[#1c1a1e] border border-neutral-800 rounded-xl h-12 px-3 text-neutral-200 text-sm flex items-center justify-between hover:bg-neutral-800 focus:border-[#4F46E5] outline-none transition-colors">
              <div className="flex items-center gap-2">
                <TbCategory className="text-lg text-[#A5B4FC] shrink-0" />
                <Select.Value placeholder="Select Category" />
              </div>
              <Select.Indicator>
                <HiChevronDown className="text-neutral-500 text-xs" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-[#121212] border border-neutral-800 text-white rounded-xl shadow-xl mt-1 z-50">
              <ListBox className="p-1 outline-none">
                <ListBox.Item
                  id="all"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>All Category</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Technology"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Technology</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Marketing"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Marketing</Label>
                </ListBox.Item>
                <ListBox.Item
                  id="Design"
                  className="p-2 text-sm rounded-lg hover:bg-neutral-800 cursor-pointer outline-none"
                >
                  <Label>Design</Label>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Filter Clear Button */}
        <button
          onClick={handleReset}
          className="w-full bg-[#1c1a1e] border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium rounded-xl h-12 flex items-center justify-center gap-2 text-sm transition-all shadow-md cursor-pointer mb-[1px]"
        >
          <HiOutlineFunnel className="text-base text-[#A5B4FC]" />
          <span>Clear Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
