import React from "react";

interface CooperationCardProps {
  title?: string;
  buttonText?: string;
  size?: "small" | "large";
}

const CooperationCard: React.FC<CooperationCardProps> = ({ title }) => {
  return (
    <div
      className={`bg-bg-primary rounded-lg overflow-hidden h-128 w-128 flex items-center justify-center p-6`}
    >
      <div className="space-y-4">
        {title && (
          <h3 className="text-text-primary text-2xl font-bold text-center">
            {title}
          </h3>
        )}
      </div>
    </div>
  );
};

export default CooperationCard;
