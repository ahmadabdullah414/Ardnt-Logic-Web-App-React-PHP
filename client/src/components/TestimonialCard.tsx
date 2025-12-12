import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  company: string;
  image?: string;
  index?: number;
}

export default function TestimonialCard({ quote, name, company, image, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card
        className="relative overflow-hidden h-full bg-gradient-to-br from-card to-background border-white/10 group"
        data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-2xl" />
        
        <CardContent className="relative p-6 md:p-8">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          
          <div className="relative mb-6">
            <p className="text-foreground leading-relaxed italic">
              "{quote}"
            </p>
          </div>

          <div className="flex items-center gap-4">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                {name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-heading font-semibold" data-testid={`text-testimonial-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>
                {name}
              </p>
              <p className="text-muted-foreground text-sm">{company}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
