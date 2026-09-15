import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { ClientSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/ClientSection";
import { ComparisonSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/ComparisonSection";
import { FaqSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/FaqSection";
import { FeaturesSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/FeaturesSection";
import { HeroSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/HeroSection";
import { IntegrationsSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/IntegrationsSection";
import { OverviewSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/OverviewSection";
import { PricingSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/PricingSection";
import { SecuritySection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/SecuritySection";
import { StatsSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/StatsSection";
import { StepSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/StepSection";
import { TestimonialSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/TestimonialSection";
import { UseCasesSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/UseCasesSection";

/**
 * Clone of https://fintechx-wbs.framer.website/
 *
 * Section order and the fixed overlay stack are taken from
 * `docs/research/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/PAGE_TOPOLOGY.md`.
 * The navbar is `position: fixed` (z-index 9); the hero reserves top padding for it. The
 * original's eight-layer progressive-blur strip behind it is dropped — the bar is a solid
 * white pill.
 */
export default function Page() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <HeroSection />
        <ClientSection />
        <ComparisonSection />
        <FeaturesSection />
        <OverviewSection />
        <StepSection />
        <SecuritySection />
        <UseCasesSection />
        <IntegrationsSection />
        <StatsSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
      </main>

      <SiteFooter />
    </div>
  );
}
