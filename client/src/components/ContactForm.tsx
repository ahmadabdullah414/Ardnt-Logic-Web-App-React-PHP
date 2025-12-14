import { useState } from "react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle, CalendarIcon, Clock, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  date: z.date().optional(),
  time: z.string().optional(),
  topic: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Generate time slots in 30-minute intervals
const generateTimeSlots = () => {
  const slots: { value: string; label: string }[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const displayTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push({ value: timeString, label: displayTime });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      date: undefined,
      time: "",
      topic: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    try {
      console.log("Sending request to /api/contact...");
      let response: Response;
      try {
        response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          message: data.message,
          date: data.date ? format(data.date, "yyyy-MM-dd") : null,
          time: data.time || null,
          topic: data.topic || null,
        }),
      });
      } catch (fetchError) {
        // Network error - server not reachable
        if (fetchError instanceof TypeError && fetchError.message.includes("fetch")) {
          throw new Error("Cannot connect to server. Please make sure the server is running and try again.");
        }
        throw fetchError;
      }

      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        throw new Error("Server returned an invalid response. Please check the server logs.");
      }

      if (!response.ok) {
        const errorMsg = responseData.error || responseData.message || "Failed to send message";
        const code = responseData.code ? ` (Code: ${responseData.code})` : "";
        throw new Error(errorMsg + code);
      }

      // Check if success is false
      if (responseData.success === false) {
        const errorMsg = responseData.error || "Failed to send message. Please check server configuration.";
        throw new Error(errorMsg);
      }

      // Verify success is true
      if (responseData.success !== true) {
        throw new Error("Unexpected response from server");
      }

      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: data.date 
          ? "We'll confirm your consultation time shortly." 
          : "We'll get back to you within 24 hours.",
      });
      form.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        // Provide more helpful messages for common errors
        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
          errorMessage = "Cannot connect to server. Please make sure the server is running and try again.";
        } else if (error.message.includes("CORS")) {
          errorMessage = "CORS error. Please check server configuration.";
        }
      }
      
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 15000, // Show longer for detailed errors
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("✅ Form validation passed, submitting:", data);
            onSubmit(data);
          },
          (errors) => {
            console.error("❌ Form validation failed:", errors);
            toast({
              title: "Validation Error",
              description: "Please fill in all required fields correctly.",
              variant: "destructive",
            });
          }
        )}
        className="space-y-6"
        data-testid="form-contact"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="bg-muted/50 border-white/10 focus:border-accent"
                    {...field}
                    data-testid="input-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-muted/50 border-white/10 focus:border-accent"
                    {...field}
                    data-testid="input-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Phone number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+123 456789"
                  className="bg-muted/50 border-white/10 focus:border-accent"
                  {...field}
                  data-testid="input-phone"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business and goals..."
                  className="min-h-[120px] resize-none bg-muted/50 border-white/10 focus:border-accent"
                  {...field}
                  data-testid="input-message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-foreground mb-2">Preferred Date (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full h-10 pl-3 text-left font-normal bg-muted/50 border-white/10 hover:bg-muted/70",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => {
              const [hour, setHour] = useState<number>(12);
              const [minute, setMinute] = useState<number>(0);
              const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
              
              // Parse current value if exists
              React.useEffect(() => {
                if (field.value) {
                  const [h, m] = field.value.split(':').map(Number);
                  if (h >= 12) {
                    setHour(h === 12 ? 12 : h - 12);
                    setAmpm("PM");
                  } else {
                    setHour(h === 0 ? 12 : h);
                    setAmpm("AM");
                  }
                  setMinute(m);
                }
              }, [field.value]);

              const updateTime = (newHour: number, newMinute: number, newAmpm: "AM" | "PM") => {
                let hour24 = newHour;
                if (newAmpm === "PM" && newHour !== 12) {
                  hour24 = newHour + 12;
                } else if (newAmpm === "AM" && newHour === 12) {
                  hour24 = 0;
                }
                const timeString = `${hour24.toString().padStart(2, "0")}:${newMinute.toString().padStart(2, "0")}`;
                field.onChange(timeString);
              };

              const incrementHour = () => {
                const newHour = hour === 12 ? 1 : hour + 1;
                setHour(newHour);
                updateTime(newHour, minute, ampm);
              };

              const decrementHour = () => {
                const newHour = hour === 1 ? 12 : hour - 1;
                setHour(newHour);
                updateTime(newHour, minute, ampm);
              };

              const incrementMinute = () => {
                const newMinute = minute === 30 ? 0 : 30;
                setMinute(newMinute);
                updateTime(hour, newMinute, ampm);
              };

              const decrementMinute = () => {
                const newMinute = minute === 0 ? 30 : 0;
                setMinute(newMinute);
                updateTime(hour, newMinute, ampm);
              };

              const incrementAmpm = () => {
                const newAmpm = "PM";
                setAmpm(newAmpm);
                updateTime(hour, minute, newAmpm);
              };

              const decrementAmpm = () => {
                const newAmpm = "AM";
                setAmpm(newAmpm);
                updateTime(hour, minute, newAmpm);
              };

              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground mb-2">Preferred Time (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full h-10 pl-3 justify-start text-left font-normal bg-muted/50 border-white/10 hover:bg-muted/70",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {field.value ? (() => {
                            const [h, m] = field.value.split(':').map(Number);
                            const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
                            const period = h >= 12 ? "PM" : "AM";
                            return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
                          })() : "Select time"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                      <PopoverContent className="w-auto p-6 bg-background border-white/10 shadow-xl" align="start">
                        <div className="space-y-4">
                          <div className="text-sm font-semibold text-center text-foreground mb-4">Select Time</div>
                          <div className="flex items-center justify-center gap-4">
                            {/* Hours */}
                            <div className="flex flex-col items-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-16 rounded-t-lg rounded-b-none border-b-0 bg-muted/50 hover:bg-accent/20"
                                onClick={incrementHour}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <div className="w-16 h-16 flex items-center justify-center bg-muted/30 border-x border-accent/30 text-2xl font-bold text-foreground">
                                {hour.toString().padStart(2, "0")}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-16 rounded-b-lg rounded-t-none border-t-0 bg-muted/50 hover:bg-accent/20"
                                onClick={decrementHour}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <div className="text-xs text-muted-foreground mt-1">Hour</div>
                            </div>

                            <div className="text-2xl font-bold text-foreground">:</div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-16 rounded-t-lg rounded-b-none border-b-0 bg-muted/50 hover:bg-primary/20"
                                onClick={incrementMinute}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <div className="w-16 h-16 flex items-center justify-center bg-muted/30 border-x border-primary/30 text-2xl font-bold text-foreground">
                                {minute.toString().padStart(2, "0")}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-16 rounded-b-lg rounded-t-none border-t-0 bg-muted/50 hover:bg-primary/20"
                                onClick={decrementMinute}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <div className="text-xs text-muted-foreground mt-1">Min</div>
                            </div>

                            {/* AM/PM */}
                            <div className="flex flex-col items-center ml-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-16 rounded-t-lg rounded-b-none border-b-0 bg-muted/50 hover:bg-accent/20"
                                onClick={incrementAmpm}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <div className="w-16 h-16 flex items-center justify-center bg-muted/30 border-x border-accent/30 text-lg font-bold text-foreground">
                                {ampm}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-8 w-16 rounded-b-lg rounded-t-none border-t-0 bg-muted/50 hover:bg-accent/20"
                                onClick={decrementAmpm}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <div className="text-xs text-muted-foreground mt-1">AM/PM</div>
                            </div>
                          </div>
                          {/* Selected time display */}
                          {field.value && (
                            <div className="text-center mt-4 pt-4 border-t border-white/10">
                              <div className="text-xs text-muted-foreground mb-1">Selected Time</div>
                              <div className="text-lg font-bold text-accent bg-accent/10 rounded-lg py-2 px-4">
                                {(() => {
                                  const [h, m] = field.value.split(':').map(Number);
                                  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
                                  const period = h >= 12 ? "PM" : "AM";
                                  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Project/Topic (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Website Consultation, SEO Services, etc."
                  className="bg-muted/50 border-white/10 focus:border-accent"
                  {...field}
                  data-testid="input-topic"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right text-white font-bold py-6 gap-2 shadow-xl shadow-accent/25 rounded-xl transition-all duration-500"
          disabled={isSubmitting}
          data-testid="button-submit-contact"
          onClick={(e) => {
            const formData = form.getValues();
            const formErrors = form.formState.errors;
            console.log("🔘 Button clicked");
            console.log("📝 Form values:", JSON.stringify(formData, null, 2));
            console.log("❌ Form errors:", JSON.stringify(formErrors, null, 2));
            console.log("✅ Form valid:", form.formState.isValid);
            
            // If form is invalid, show detailed errors
            if (Object.keys(formErrors).length > 0) {
              console.error("Form has validation errors, preventing submission");
              const errorMessages = Object.entries(formErrors).map(([key, value]: [string, any]) => 
                `${key}: ${value?.message || JSON.stringify(value)}`
              ).join('\n');
              console.error("Error details:\n", errorMessages);
            }
          }}
        >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </motion.span>
              ) : isSuccess ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Message Sent!
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Schedule a Free Consultation
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
      </form>
    </Form>
  );
}
