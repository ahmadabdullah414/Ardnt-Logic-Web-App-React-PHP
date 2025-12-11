import ServiceCard from "../ServiceCard";
import { Globe } from "lucide-react";

export default function ServiceCardExample() {
  return (
    <div className="max-w-sm">
      <ServiceCard
        icon={Globe}
        title="Website Design"
        description="Beautiful, user-friendly websites optimized for desktop and mobile."
      />
    </div>
  );
}
