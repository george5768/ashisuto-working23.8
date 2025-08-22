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
    <div className="relative w-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 w-full max-w-4xl px-4">

        {/* Left Side (Desktop Only) */}
        <div className={`hidden md:block ${isLeft ? "text-right pr-6" : ""}`}>
          {isLeft && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{date}</p>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          )}
        </div>

        {/* Timeline Dot & Line */}
        <div className="flex flex-col items-center justify-start relative">
          <div className="w-4 h-4 rounded-full bg-primary z-10" />
          {!isLast && <div className="w-px h-full bg-border mt-1" />}
        </div>

        {/* Right Side (Desktop Only) */}
        <div className={`hidden md:block ${!isLeft ? "text-left pl-6" : ""}`}>
          {!isLeft && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{date}</p>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          )}
        </div>

        {/* Mobile Stack: Full width content */}
        <div className="md:hidden col-span-3">
          <div className="space-y-1 text-left text-muted-foreground">
            <p className="text-sm">{date}</p>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>

      </div>
    </div>
  );
};