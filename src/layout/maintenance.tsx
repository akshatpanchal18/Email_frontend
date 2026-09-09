import MaintenanceImage from "../asset/maintenance.svg";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-2xl bg-amber-400/10 text-4xl">
          <img src={MaintenanceImage} alt="" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
          Maintenance Mode
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          We’ll be back soon.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
          We’re currently performing some scheduled maintenance to improve your
          experience. Please check back shortly.
        </p>

        <div className="mx-auto mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          <span>Our team is working on it</span>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
