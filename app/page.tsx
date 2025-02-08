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
            Report and Analyze Potholes with AI
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1E1E1E80] dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            Utilize AI to efficiently report, track, and prioritize potholes in
            your community. With our system, you can identify road hazards,
            provide critical data for repairs, and help create safer roadways
            for everyone.
          </p>
          <Link href="/report">
            <Button size="lg" className="mt-9 bg-[#362864ED]">
              Report a Pothole <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section id="features" className="my-12 sm:my-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#362864] dark:text-white mb-8 text-center">
            Key Features for Pothole Reporting
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              title="AI-Powered Detection"
              description="AI technology automatically identifies potholes from images, assesses their size, and determines their severity."
            />
            <FeatureCard
              title="Location Tracking"
              description="Precise GPS integration maps pothole locations, helping authorities prioritize repairs based on traffic volume and severity."
            />
            <FeatureCard
              title="Regular Road Inspections"
              description="Routine assessments can identify early signs of deterioration, allowing for timely interventions."
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="my-12 sm:my-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#362864] dark:text-white mb-8 text-center">
            Benefits for Your Community
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <BenefitItem text="Improved road safety and smoother driving conditions for all road users, reducing the risk of accidents caused by potholes." />
            <BenefitItem text="Faster response times to pothole-related issues, ensuring that critical repairs are made swiftly, especially in high-traffic areas." />
            <BenefitItem text="Optimized resource allocation for quicker repairs, saving both time and money by directing resources to areas in urgent need of attention." />
            <BenefitItem text="Enhanced collaboration between citizens, local authorities, and maintenance teams, fostering community-driven solutions to road hazards." />
            <BenefitItem text="Reduced wear and tear on vehicles, which saves individuals and businesses from costly repairs due to road-related damage." />
            <BenefitItem text="Data-driven insights for future infrastructure planning, enabling municipalities to make informed decisions about road maintenance and upgrades." />
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
