import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
}

export default function TestimonialCard({ quote, name, company }: TestimonialCardProps) {
  return (
    <Card
      className="h-full"
      data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <CardContent className="p-6">
        <Quote className="w-8 h-8 text-accent mb-4" />
        <p className="text-foreground mb-6 leading-relaxed italic">"{quote}"</p>
        <div>
          <p className="font-heading font-semibold" data-testid={`text-testimonial-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>
            {name}
          </p>
          <p className="text-muted-foreground text-sm">{company}</p>
        </div>
      </CardContent>
    </Card>
  );
}
