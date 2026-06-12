import {
  FaCrown,
  FaBolt,
  FaChartLine,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";


// Pricing Data
export const PRICING_DATA = {
  seekers: [
    {
      id: "seeker_free",
      name: "Free",
      price: "0",
      period: "/forever",
      icon: FaCrown,
      iconColor: "text-neutral-400",
      cardVariant: "default",
      subtitle: "Essential tools to start your journey:",
      buttonText: "Free Plan",
      features: [
        { text: "Browse & save up to 10 jobs", disabled: false },
        { text: "Apply to up to 3 jobs per month", disabled: false },
        { text: "Basic profile setup", disabled: false },
        { text: "Instant email alerts", disabled: false },
      ],
    },
    {
      id: "seeker_pro",
      name: "Pro",
      price: "19",
      period: "/month",
      icon: FaChartLine,
      iconColor: "text-indigo-400",
      cardVariant: "tertiary",
      subtitle: "Accelerate your hiring response:",
      buttonText: "Upgrade to Pro",
      features: [
        {
          text: "Apply to up to 30 jobs per month",
          disabled: false,
          highlightText: true,
        },
        { text: "Unlimited saved jobs", disabled: false },
        { text: "Real-time application tracking", disabled: false },
        { text: "Advanced salary insights", disabled: false },
      ],
    },
    {
      id: "seeker_premium",
      name: "Premium",
      price: "39",
      period: "/month",
      icon: FaBolt,
      iconColor: "text-purple-400",
      cardVariant: "default",
      subtitle: "Maximum competitive advantage:",
      buttonText: "Upgrade to Premium",
      features: [
        { text: "Everything in Pro included", disabled: false },
        { text: "Unlimited job applications", disabled: false },
        { text: "Profile boost directly to recruiters", disabled: false },
        { text: "Early access to newly posted jobs", disabled: false },
        { text: "Priority developer support", disabled: false },
      ],
    },
  ],
  recruiters: [
    {
      id: "recruiter_free",
      name: "Free",
      price: "0",
      period: "/forever",
      icon: FaCrown,
      iconColor: "text-neutral-400",
      cardVariant: "default",
      subtitle: "Great for your first year of hiring:",
      buttonText: "Start Free",
      features: [
        { text: "Up to 3 active job posts", disabled: false },
        { text: "Basic applicant management pipeline", disabled: false },
        { text: "Standard listing visibility tier", disabled: false },
      ],
    },
    {
      id: "recruiter_growth",
      name: "Growth",
      price: "49",
      period: "/month",
      icon: FaChartLine,
      iconColor: "text-indigo-400",
      cardVariant: "tertiary",
      subtitle: "Scale your core engineering squads:",
      buttonText: "Upgrade to Growth",
      features: [
        {
          text: "Up to 10 active job posts",
          disabled: false,
          highlightText: true,
        },
        { text: "Full ATS Applicant tracking systems", disabled: false },
        { text: "Basic recruitment analytics", disabled: false },
        { text: "Direct email support desk", disabled: false },
      ],
    },
    {
      id: "recruiter_enterprise",
      name: "Enterprise",
      price: "149",
      period: "/month",
      icon: FaBolt,
      iconColor: "text-purple-400",
      cardVariant: "default",
      subtitle: "High-volume corporate infrastructure:",
      buttonText: "Contact Sales",
      features: [
        { text: "Up to 50 active job posts dashboard", disabled: false },
        { text: "Advanced analytics & custom metrics", disabled: false },
        { text: "Featured premium job listings", disabled: false },
        { text: "Team collaboration & seats access", disabled: false },
        { text: "Custom branding & white-labeled portal", disabled: false },
        { text: "Priority dedicated success manager", disabled: false },
      ],
    },
  ],
};

export const TABS_CONFIG = [
  { id: "seekers", label: "For Job Seekers", icon: FaBriefcase },
  { id: "recruiters", label: "For Recruiters", icon: FaBuilding },
];
