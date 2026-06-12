import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi2";

const FAQComponet = ({ FAQ_DATA, openFaq, toggleFaq }) => {
  return (
    <div className="max-w-5xl mx-auto mt-20 border-t border-neutral-800 pt-16">
      <div className="flex items-center gap-2.5 mb-8 justify-center md:justify-start">
        <span className="w-7 h-7 bg-[#111113] border border-neutral-700 rounded-md flex items-center justify-center text-xs text-neutral-400">
          <FaShieldAlt />
        </span>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Frequently Asked Queries
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className={`bg-[#0b0b0c] border rounded-[16px] px-5 transition-all duration-300 ${
                isOpen ? "border-neutral-800" : "border-neutral-900"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between py-4 text-left font-medium text-sm text-neutral-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>{faq.title}</span>
                <HiChevronDown
                  size={16}
                  className={`text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`}
                />
              </button>

              {/* Smooth Expandable Content Wrapper */}
              <div
                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-5"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden text-neutral-400 text-xs leading-relaxed">
                  <p>{faq.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQComponet;
