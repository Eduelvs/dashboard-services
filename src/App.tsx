import { useRef } from "react";
import { GlassCard } from "../components";
import { useGithubStatusQuery } from "./services/queries/github.query";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useGithubStatusQuery();

  return (
    <div ref={containerRef} className="relative w-full min-h-screen h-screen overflow-visible">
      <img
        src="/img/image-like.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <GlassCard name={data?.platform ?? ""} status={data?.status ?? ""} uptime={data?.uptime ?? 0} latency={data?.latency ?? 0} lastUpdated={data?.lastUpdated ?? ""} history={data?.history ?? []} mouseContainerRef={containerRef} />
    </div>
  );
}