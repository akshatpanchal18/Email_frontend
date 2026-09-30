interface DummyAdsProps {
  height?: string;
  className?: string;
}

const DummyAds = ({ height = "250px", className = "" }: DummyAdsProps) => {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-200 text-xs text-gray-600 animate-pulse ${className}`}
      style={{ minHeight: height }}
    >
      Advertisement
    </div>
  );
};

export default DummyAds;
