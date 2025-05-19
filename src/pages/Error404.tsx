import FuzzyText from "@/components/404/404Text";

export default function ErrorPage() {
  return (
    <div
    className="w-full h-full min-h-[80vh] flex flex-col justify-center items-center gap-5"
    >
      <FuzzyText 
      baseIntensity={0.2} 
      hoverIntensity={0.5} 
      enableHover={true}
      fontSize="clamp(15rem, 8vw, 8rem)"
      >
        400
      </FuzzyText>
      <FuzzyText 
      baseIntensity={0.2} 
      hoverIntensity={0.5} 
      enableHover={true}
      fontSize="clamp(2rem, 8vw, 8rem)"
      >
        not found
      </FuzzyText>
    </div>
  );
}
