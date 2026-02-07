import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import ProblemStatement from '@/components/home/ProblemStatement';
import Solutions from '@/components/home/Solutions';
import SocialProof from '@/components/home/SocialProof';
import HowItWorks from '@/components/home/HowItWorks';
import Technology from '@/components/home/Technology';
import PricingPreview from '@/components/home/PricingPreview';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProblemStatement />
      <Solutions />
      <SocialProof />
      <HowItWorks />
      <Technology />
      <PricingPreview />
      <FinalCTA />
    </>
  );
}
