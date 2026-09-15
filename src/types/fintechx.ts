/** Content contracts for the FintechX clone (fintechx-wbs.framer.website). */

export interface NavLink {
  label: string;
  href: string;
}

export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BulletPoint {
  text: string;
}

export interface StatBadge {
  value: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface StepItem {
  index: string;
  title: string;
  description: string;
  image?: string;
}

export interface UseCaseItem {
  image: string;
  title?: string;
  description?: string;
}

export interface IntegrationItem {
  icon: string;
  name: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
