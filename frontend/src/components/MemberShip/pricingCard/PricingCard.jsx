import { Button, Card } from "@heroui/react";
import React from "react";
import { HiArrowRight, HiPlus } from "react-icons/hi2";

const PricingCard = ({ planItem }) => {
  const IconComponent = planItem.icon;
  const isTertiary = planItem.cardVariant === "tertiary";
  return (
    <Card
      variant={planItem.cardVariant}
      className={`rounded-[20px] p-6 flex flex-col justify-between shadow-xl transition-all duration-300 ${
        isTertiary
          ? "bg-[#111113] border border-neutral-800 md:scale-[1.03] shadow-2xl ring-1 ring-neutral-700/20"
          : "bg-[#0b0b0c] border border-neutral-900"
      }`}
    >
      <Card.Header className="p-0 flex flex-col items-stretch bg-transparent border-none">
        <div className="flex justify-between items-start gap-2 mb-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-sm shrink-0">
              <IconComponent className={planItem.iconColor} />
            </span>
            <Card.Title
              className={`text-lg font-bold tracking-tight truncate m-0 ${isTertiary ? "text-white" : "text-neutral-200"}`}
            >
              {planItem.name}
            </Card.Title>
          </div>
          <div className="flex items-baseline text-white shrink-0">
            <span className="text-3xl font-bold">${planItem.price}</span>
            <span className="text-white/60 text-xs ml-0.5 tracking-tight">
              {planItem.period}
            </span>
          </div>
        </div>
        <Card.Description
          className={`text-xs font-medium mb-5 ${isTertiary ? "text-neutral-300" : "text-neutral-400"}`}
        >
          {planItem.subtitle}
        </Card.Description>
      </Card.Header>

      <Card.Content className="p-0 bg-transparent overflow-visible flex flex-col h-full justify-between">
        <ul className="space-y-3.5 mb-8 text-xs">
          {planItem.features.map((feature, fIdx) => (
            <li
              key={fIdx}
              className={`flex items-start gap-2.5 leading-relaxed ${
                feature.disabled
                  ? "text-neutral-500"
                  : feature.highlightText
                    ? "font-semibold text-indigo-400"
                    : isTertiary
                      ? "text-neutral-300"
                      : "text-neutral-400"
              }`}
            >
              <span
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                  feature.disabled
                    ? "bg-neutral-900 border-neutral-800 text-neutral-600"
                    : feature.highlightText
                      ? "bg-indigo-950 border-indigo-800 text-indigo-400"
                      : isTertiary
                        ? "bg-neutral-800 border-neutral-700 text-neutral-300"
                        : "bg-neutral-900 border-neutral-800 text-neutral-500"
                }`}
              >
                <HiPlus size={10} />
              </span>
              <span className="break-words min-w-0">{feature.text}</span>
            </li>
          ))}
        </ul>

          {/* Payment Button */}
        <div>
          <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="plan_id" value={planItem.id} />
            <section>
              <button
                className={`rounded-xl w-full h-11 text-xs font-bold transition-all flex items-center justify-between px-4 mt-auto group cursor-pointer ${
                  isTertiary
                    ? "bg-white/90 hover:bg-white/80 text-black"
                    : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300"
                }`}
                type="submit"
                role="link"
              >
                <span>{planItem.buttonText}</span>
                <HiArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </section>
          </form>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PricingCard;
