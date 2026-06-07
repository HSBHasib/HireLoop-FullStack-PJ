import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdPerson4 } from "react-icons/md";
import Image from "next/image";

const Footer = () => {
  // All Socail Icons and Links
  const socialLinks = [
    { id: 1, icon: MdPerson4, href: "https://hasib-portfolio-silk.vercel.app/", isCustomBg: false },
    { id: 2, icon: FaLinkedinIn, href: "https://www.linkedin.com/in/hasibur-rahman19/", isCustomBg: true },
    { id: 3, icon: FaGithub, href: "https://github.com/HSBHasib", isCustomBg: false },
  ];

  // All Footer Links
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "#" },
        { label: "Worker AI", href: "#" },
        { label: "Companies", href: "#" },
        { label: "Salary data", href: "#" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { label: "Help center", href: "#" },
        { label: "Career library", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "#" },
        { label: "Newsroom", href: "#" },
      ],
    },
  ];

  return (
    <>
<<<<<<< HEAD
      <footer className="w-full bg-[#010103] border-t pt-14 px-6">
=======
      <footer className="w-full pt-14 px-6 border-t border-b-neutral-600 bg-[#010103]">
>>>>>>> 06032b76af6e02f78f4616de1be9ba2422953a44
        {/* Footer Top Part */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          {/* Footer Company Logo and Info Msg about company */}
          <div className="flex flex-col gap-3 max-w-sm">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="hireLoop Logo"
                width={800}
                height={800}
                priority
                className="object-contain w-[120px] h-auto" 
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#B9B8C2] sm:w-[80%]">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Footer All Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-20">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-[#6366F1] tracking-wider">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3 text-sm font-medium">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors text-[#B9B8C2]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* (Footer Bottom Part) - Socail Links and Copy Right and other simple dets.... */}
        <div className="max-w-7xl mx-auto mt-14 border-t py-4 border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-600">
          {/* Socail Links */}
          <div className="flex items-center gap-3 pt-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Link
                  key={social.id}
                  target="_blank"
                  href={social.href}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
                    social.isCustomBg
                      ? "bg-[#5850EC] text-white hover:opacity-90"
                      : "bg-white/5 border border-white/5 hover:bg-white/10 text-white"
                  }`}
                >
                  <IconComponent size={16} />
                </Link>
              );
            })}
          </div>

          {/* Copy Right and other simple dets.... */}
          <div>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <div>
                <p className="text-[#B9B8C2]/50 mr-3">
                  Copyright 2026 —HireLoop
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#B9B8C2]">
                <Link href="#" className="hover:text-white transition-colors">
                  Terms & Policy
                </Link>
                <span>—</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Guideline
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

