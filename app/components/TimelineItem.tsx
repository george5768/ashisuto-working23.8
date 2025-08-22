import React from "react";

interface TimelineItemProps {
  title: string;
  description: string;
  date: string;
  index: number;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  date,
  index,
  isLast,
}) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-y-0 w-full max-w-4xl mx-auto">

        {/* Left Side (Desktop Only) */}
        <div className={`hidden md:block ${isLeft ? "text-right pr-6" : ""}`}>
          {isLeft && (
            <div className="space-y-2">
              <p className="text-sm md:text-base text-muted-foreground font-medium">{date}</p>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">{title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{description}</p>
            </div>
          )}
        </div>

        {/* Timeline Dot & Line */}
        <div className="flex flex-col items-center justify-start relative">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary z-10 border-4 border-background shadow-md" />
          {!isLast && <div className="w-0.5 h-full md:h-16 bg-border mt-1" />}
        </div>

        {/* Right Side (Desktop Only) */}
        <div className={`hidden md:block ${!isLeft ? "text-left pl-6" : ""}`}>
          {!isLeft && (
            <div className="space-y-2">
              <p className="text-sm md:text-base text-muted-foreground font-medium">{date}</p>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">{title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{description}</p>
            </div>
          )}
        </div>

        {/* Mobile Stack: Full width content */}
        <div className="md:hidden col-span-3">
          <div className="space-y-3 text-left p-4 bg-card rounded-lg border border-border">
            <p className="text-sm md:text-base font-semibold text-primary">{date}</p>
            <h3 className="text-lg md:text-xl font-bold text-foreground">{title}</h3>
            <p className="text-sm md:text-base text-muted-foreground">{description}</p>
          </div>
        </div>

      </div>
    </div>
  );
};