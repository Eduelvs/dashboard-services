import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaAws, FaDocker, FaGithub, FaStripe } from "react-icons/fa";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { GlassButton, GlassCard } from "../components";
import { useAwsStatusQuery } from "./services/queries/aws.query";
import { useDockerStatusQuery } from "./services/queries/docker.query";
import { useGithubStatusQuery } from "./services/queries/github.query";
import { useStripeStatusQuery } from "./services/queries/stripe.query";

type ViewMode = "grid" | "line";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { data } = useGithubStatusQuery();
  const { data: awsStatus } = useAwsStatusQuery();
  const { data: stripeStatus } = useStripeStatusQuery();
  //docker
  const { data: dockerStatus } = useDockerStatusQuery();

  const iconMap = {
    github: <FaGithub size={24} />,
    aws: <FaAws size={24} />,
    stripe: <FaStripe size={24} />,
    docker: <FaDocker size={24} />,
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen h-screen overflow-visible">
      <img
        src="/img/image-like.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      <GlassCard name={data?.platform ?? ""} status={data?.status ?? ""} top={30} left={15} uptime={data?.uptime ?? 0} latency={data?.latency ?? 0} lastUpdated={data?.lastUpdated ?? ""} history={data?.history ?? []} mouseContainerRef={containerRef} icon={iconMap[data?.platform?.toLowerCase() as keyof typeof iconMap]} />
      <GlassCard name="Amazon Web" status={awsStatus?.status ?? ""} top={30} left={35} uptime={awsStatus?.uptime ?? 0} latency={awsStatus?.latency ?? 0} lastUpdated={awsStatus?.lastUpdated ?? ""} history={awsStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["aws"]} />
      <GlassCard name="Stripe" status={stripeStatus?.status ?? ""} top={30} left={55} uptime={stripeStatus?.uptime ?? 0} latency={stripeStatus?.latency ?? 0} lastUpdated={stripeStatus?.lastUpdated ?? ""} history={stripeStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["stripe"]} />
      <GlassCard name="Docker" status={dockerStatus?.status ?? ""} top={30} left={75} uptime={dockerStatus?.uptime ?? 0} latency={dockerStatus?.latency ?? 0} lastUpdated={dockerStatus?.lastUpdated ?? ""} history={dockerStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["docker"]} />

  {viewMode === "grid" ? (
  <AnimatePresence mode="sync">
    <motion.div
      key="grid"
      initial={{ opacity: 1, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 1, y: -20, scale: 0.95 }}
      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0"
    >
      <GlassCard name={data?.platform ?? ""} status={data?.status ?? ""} top={70} left={15} uptime={data?.uptime ?? 0} latency={data?.latency ?? 0} lastUpdated={data?.lastUpdated ?? ""} history={data?.history ?? []} mouseContainerRef={containerRef} icon={iconMap[data?.platform?.toLowerCase() as keyof typeof iconMap]} />
      <GlassCard name="Amazon Web" status={awsStatus?.status ?? ""} top={70} left={35} uptime={awsStatus?.uptime ?? 0} latency={awsStatus?.latency ?? 0} lastUpdated={awsStatus?.lastUpdated ?? ""} history={awsStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["aws"]} />
      <GlassCard name="Stripe" status={stripeStatus?.status ?? ""} top={70} left={55} uptime={stripeStatus?.uptime ?? 0} latency={stripeStatus?.latency ?? 0} lastUpdated={stripeStatus?.lastUpdated ?? ""} history={stripeStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["stripe"]} />
      <GlassCard name="Docker" status={dockerStatus?.status ?? ""} top={70} left={75} uptime={dockerStatus?.uptime ?? 0} latency={dockerStatus?.latency ?? 0} lastUpdated={dockerStatus?.lastUpdated ?? ""} history={dockerStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["docker"]} />
    </motion.div>
    </AnimatePresence>
  ) : null}
      <GlassButton top={10} left={93}>
        <div className="relative flex items-center gap-1 p-0.5 rounded-full bg-transparent">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-w-18 justify-center border-none outline-none bg-transparent hover:bg-white/[0.06]"
            aria-pressed={viewMode === "grid"}
            aria-label="Visualização em grid"
            style={{
              backgroundColor: "transparent",
            }}
          >
            {viewMode === "grid" ? (
              <span className="text-white/95">Grid</span>
            ) : (
              <span className="text-white/60">Grid</span>
            )}
            <HiOutlineViewGrid className="size-4 shrink-0 text-white/95" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("line")}
            className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-w-18 justify-center border-none outline-none bg-transparent hover:bg-white/[0.06]"
            aria-pressed={viewMode === "line"}
            aria-label="Visualização em linha"
            style={{
              backgroundColor: "transparent",
            }}
          >
            {viewMode === "line" ? (
              <span className="text-white/95">Line</span>
            ) : (
              <span className="text-white/60">Line</span>
            )}
            <HiOutlineViewList className="size-4 shrink-0 text-white/95" />
          </button>
          <span
            className="absolute left-0 top-0.5 bottom-0.5 z-0 w-[calc(50%-4px)] rounded-full bg-white/20 transition-transform duration-200 ease-out"
            style={{
              transform: viewMode === "line" ? "translateX(calc(100% + 4px))" : "translateX(4px)",
            }}
            aria-hidden
          />
        </div>
      </GlassButton>

    </div>
  );
}