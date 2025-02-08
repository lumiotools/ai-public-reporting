import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PotholeReportAnalysis() {
  return (
    <>
      <main className="container mx-auto pb-10 px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <section className="space-y-6 text-center mb-12 mt-8 sm:mt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#362864] dark:text-white">
            Empowering Community with AI-Powered Reporting
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1E1E1E80] dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            Use our advanced AI system to report and track local issues such as
            road damage, waste disposal, and environmental hazards. Together, we
            can build a safer and cleaner community.
          </p>
          <Link href="/report">
            <Button size="lg" className="mt-9 bg-[#362864ED]">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section id="features" className="my-12 sm:my-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#362864] dark:text-white mb-8 text-center">
            Key Features for Reporting
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              title="AI-Powered Analysis"
              description="Our advanced AI system accurately categorizes and prioritizes reported issues."
            />
            <FeatureCard
              title="Image Upload"
              description="Upload images of the issue for more accurate assessment and faster resolution."
            />
            <FeatureCard
              title="Structured Reporting"
              description="Guided questions ensure all relevant details are captured for efficient processing."
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="my-12 sm:my-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#362864] dark:text-white mb-8 text-center">
            Benefits for Community
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <BenefitItem text="Streamlined issue reporting process" />
          <BenefitItem text="Improved response efficiency from local authorities" />
          <BenefitItem text="Enhanced community participation in local development" />
          <BenefitItem text="Data-driven insights for urban planning and management" />
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#362864] dark:text-white mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[#1E1E1E80] dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle className="text-green-500 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
      <p className="text-sm sm:text-base md:text-lg text-[#1E1E1E] dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}
