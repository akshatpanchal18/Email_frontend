import VerticalAd from "../components/vertical-player";

interface Props {
  height?: string;
  className?: string;
}

const VerticalAds = ({ height = "550px", className = "" }: Props) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`} style={{ height }}>
      <VerticalAd />
    </div>
  );
};

export default VerticalAds;
