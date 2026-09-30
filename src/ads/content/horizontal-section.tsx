import HorizontalAd from "../components/horizontal-player";

interface Props {
  height?: string;
  className?: string;
}

const HorizontalAds = ({ height = "250px", className = "" }: Props) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`} style={{ height }}>
      <HorizontalAd />
    </div>
  );
};

export default HorizontalAds;
