"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const steps = [
  { id: "contact", title: "Contact" },
  { id: "practice", title: "Practice & Role" },
  { id: "specialty", title: "Specialty" },
  { id: "service", title: "Service" },
  { id: "challenges", title: "Challenges" },
];

export interface StrategyCallFormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  countryCode: string;
  phoneNumber: string;
  practiceName: string;
  role: string;
  specialty: string;
  primaryService: string;
  challenges: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

const roleOptions = [
  "Physician",
  "Practice Manager",
  "Medical Director",
  "Billing Manager",
  "Operations Manager",
  "Executive / C-Suite",
  "Other Practice Leadership",
];

const specialtyOptions = [
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Family Medicine",
  "Internal Medicine",
  "Neurology",
  "Pediatrics",
  "Oncology",
  "Gastroenterology",
  "Urology",
  "Pain Management",
  "Mental Health / Psychiatry",
  "Other Specialty",
];

const serviceOptions = [
  "Prior Authorization",
  "Insurance Verification",
  "Medical Coding",
  "Charge Entry",
  "Medical Billing",
  "Payment Posting & Reconciliation",
  "Denial Management & Appeals",
  "Full End-to-End Revenue Cycle Management",
];

export default function StrategyCallForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<StrategyCallFormData>({
    firstName: "",
    lastName: "",
    workEmail: "",
    countryCode: "+1",
    phoneNumber: "",
    practiceName: "",
    role: "",
    specialty: "",
    primaryService: "",
    challenges: "",
  });

  const updateFormData = (field: keyof StrategyCallFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  // Validation per step
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName.trim() !== "" && formData.lastName.trim() !== "" && formData.workEmail.trim() !== "";
      case 1:
        return formData.practiceName.trim() !== "" && formData.role !== "";
      case 2:
        return formData.specialty !== "";
      case 3:
        return formData.primaryService !== "";
      case 4:
        return true;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-2xl dark:shadow-black/50 space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-400 border border-teal-200 dark:border-teal-800 flex items-center justify-center mx-auto shadow-md">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
            Strategy Session <span className="italic text-brand dark:text-teal-400 font-medium">Requested!</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-md mx-auto">
            Thank you, <strong className="text-slate-900 dark:text-white font-medium">{formData.firstName} {formData.lastName}</strong>. Our healthcare revenue cycle leadership has received your request and will reach out to <strong className="text-slate-900 dark:text-white font-medium">{formData.workEmail}</strong> shortly.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto font-sans">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Practice:</span>
            <span className="font-medium text-slate-900 dark:text-white">{formData.practiceName || "Practice"}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Specialty:</span>
            <span className="font-medium text-slate-900 dark:text-white">{formData.specialty || "General"}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Service:</span>
            <span className="font-medium text-brand dark:text-teal-300">{formData.primaryService || "Consultation"}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
            }}
            variant="outline"
            className="rounded-2xl"
          >
            Submit Another Request
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-4 sm:py-6">
      {/* Progress Indicator Steps */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between mb-3 px-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                if (index <= currentStep) {
                  setCurrentStep(index);
                }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300",
                  index < currentStep
                    ? "bg-brand dark:bg-teal-500 text-white"
                    : index === currentStep
                      ? "bg-brand dark:bg-teal-500 text-white ring-4 ring-brand/20 dark:ring-teal-500/20"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500",
                )}
              >
                {index < currentStep ? <Check className="w-3 h-3 stroke-[3]" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] mt-1.5 hidden sm:block font-sans",
                  index === currentStep
                    ? "text-brand dark:text-teal-300 font-semibold"
                    : "text-slate-400 dark:text-slate-500",
                )}
              >
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 via-brand to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Multi-Step Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <Card className="border border-slate-200/80 dark:border-slate-800 shadow-2xl dark:shadow-black/50 rounded-3xl overflow-hidden relative">
          {/* Top Accent Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
            >
              {/* Step 1: Contact Information */}
              {currentStep === 0 && (
                <>
                  <CardHeader>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand dark:text-teal-300 uppercase tracking-wider font-sans mb-1">
                      <span>Step 1 of 5</span>
                    </div>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Let&apos;s start with your basic contact details so we know who to follow up with.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="firstName">First Name <span className="text-teal-600 dark:text-teal-400">*</span></Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="lastName">Last Name <span className="text-teal-600 dark:text-teal-400">*</span></Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="workEmail">Work Email <span className="text-teal-600 dark:text-teal-400">*</span></Label>
                      <Input
                        id="workEmail"
                        type="email"
                        placeholder="john@clinic.com"
                        value={formData.workEmail}
                        onChange={(e) => updateFormData("workEmail", e.target.value)}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="flex gap-2">
                        <div className="w-28 flex-shrink-0">
                          <Select
                            value={formData.countryCode}
                            onValueChange={(val) => updateFormData("countryCode", val)}
                          >
                            <SelectTrigger id="countryCode">
                              <SelectValue placeholder="+1" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+1">+1 (US)</SelectItem>
                              <SelectItem value="+91">+91 (IN)</SelectItem>
                              <SelectItem value="+44">+44 (UK)</SelectItem>
                              <SelectItem value="+61">+61 (AU)</SelectItem>
                              <SelectItem value="+971">+971 (UAE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="(469) 000-0000"
                          value={formData.phoneNumber}
                          onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </motion.div>
                  </CardContent>
                </>
              )}

              {/* Step 2: Practice & Role */}
              {currentStep === 1 && (
                <>
                  <CardHeader>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand dark:text-teal-300 uppercase tracking-wider font-sans mb-1">
                      <span>Step 2 of 5</span>
                    </div>
                    <CardTitle>Practice & Role</CardTitle>
                    <CardDescription>
                      Tell us about your organization and your operational responsibility.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="practiceName">
                        Practice / Organization Name <span className="text-teal-600 dark:text-teal-400">*</span>
                      </Label>
                      <Input
                        id="practiceName"
                        placeholder="e.g. Apex Health Clinic"
                        value={formData.practiceName}
                        onChange={(e) => updateFormData("practiceName", e.target.value)}
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="role">
                        Your Role at the Practice <span className="text-teal-600 dark:text-teal-400">*</span>
                      </Label>
                      <Select
                        value={formData.role}
                        onValueChange={(val) => updateFormData("role", val)}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </CardContent>
                </>
              )}

              {/* Step 3: Medical Specialty */}
              {currentStep === 2 && (
                <>
                  <CardHeader>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand dark:text-teal-300 uppercase tracking-wider font-sans mb-1">
                      <span>Step 3 of 5</span>
                    </div>
                    <CardTitle>Medical Specialty</CardTitle>
                    <CardDescription>
                      Select your primary clinical specialty to match you with specialized certified coders and authorization experts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="specialty">
                        Medical Specialty <span className="text-teal-600 dark:text-teal-400">*</span>
                      </Label>
                      <Select
                        value={formData.specialty}
                        onValueChange={(val) => updateFormData("specialty", val)}
                      >
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="Select your medical specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialtyOptions.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </CardContent>
                </>
              )}

              {/* Step 4: Primary Service Needed */}
              {currentStep === 3 && (
                <>
                  <CardHeader>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand dark:text-teal-300 uppercase tracking-wider font-sans mb-1">
                      <span>Step 4 of 5</span>
                    </div>
                    <CardTitle>Primary Service Needed</CardTitle>
                    <CardDescription>
                      Which operational or revenue cycle workflow requires immediate focus?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="primaryService">
                        Primary Service Needed <span className="text-teal-600 dark:text-teal-400">*</span>
                      </Label>
                      <Select
                        value={formData.primaryService}
                        onValueChange={(val) => updateFormData("primaryService", val)}
                      >
                        <SelectTrigger id="primaryService">
                          <SelectValue placeholder="Select primary service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </CardContent>
                </>
              )}

              {/* Step 5: Current Challenges */}
              {currentStep === 4 && (
                <>
                  <CardHeader>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand dark:text-teal-300 uppercase tracking-wider font-sans mb-1">
                      <span>Step 5 of 5</span>
                    </div>
                    <CardTitle>Tell us about your challenges</CardTitle>
                    <CardDescription>
                      Describe your current operational bottlenecks, denial trends, or timeline requirements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <Label htmlFor="challenges">Operational Challenges (Optional)</Label>
                      <Textarea
                        id="challenges"
                        rows={4}
                        placeholder="Example: We are experiencing delays in prior authorizations, claim denials, or staffing shortages. Tell us how we can help."
                        value={formData.challenges}
                        onChange={(e) => updateFormData("challenges", e.target.value)}
                      />
                    </motion.div>

                    {/* Trust confirmation badge */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-sans">
                      <ShieldCheck className="w-5 h-5 text-brand dark:text-teal-400 flex-shrink-0" />
                      <span>All patient health & organizational information is protected under executed BAA and strict HIPAA compliance.</span>
                    </div>
                  </CardContent>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Card Footer Navigation */}
          <CardFooter className="flex justify-between pt-6 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-1 rounded-2xl"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>

            <Button
              type="button"
              onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
              disabled={!isStepValid() || isSubmitting}
              className="flex items-center gap-1.5 rounded-2xl bg-brand dark:bg-teal-600 hover:bg-brand-dark dark:hover:bg-teal-500 text-white shadow-md shadow-brand/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Securing Session...
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  Book a Strategy Call <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next Step <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Step Indicator Subtext */}
      <motion.div
        className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
}
