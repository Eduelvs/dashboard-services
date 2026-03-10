import { useRef } from "react";
import { FaAws, FaDocker, FaGithub, FaStripe } from "react-icons/fa";
import { GlassCard } from "../components";
import { useAwsStatusQuery } from "./services/queries/aws.query";
import { useDockerStatusQuery } from "./services/queries/docker.query";
import { useGithubStatusQuery } from "./services/queries/github.query";
import { useStripeStatusQuery } from "./services/queries/stripe.query";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      <GlassCard name={data?.platform ?? ""} status={data?.status ?? ""} top={35} left={15} uptime={data?.uptime ?? 0} latency={data?.latency ?? 0} lastUpdated={data?.lastUpdated ?? ""} history={data?.history ?? []} mouseContainerRef={containerRef} icon={iconMap[data?.platform?.toLowerCase() as keyof typeof iconMap]} />
      <GlassCard name="Amazon Web" status={awsStatus?.status ?? ""} top={35} left={35} uptime={awsStatus?.uptime ?? 0} latency={awsStatus?.latency ?? 0} lastUpdated={awsStatus?.lastUpdated ?? ""} history={awsStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["aws"]} />
      <GlassCard name="Stripe" status={stripeStatus?.status ?? ""} top={35} left={55} uptime={stripeStatus?.uptime ?? 0} latency={stripeStatus?.latency ?? 0} lastUpdated={stripeStatus?.lastUpdated ?? ""} history={stripeStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["stripe"]} />
      <GlassCard name="Docker" status={dockerStatus?.status ?? ""} top={35} left={75} uptime={dockerStatus?.uptime ?? 0} latency={dockerStatus?.latency ?? 0} lastUpdated={dockerStatus?.lastUpdated ?? ""} history={dockerStatus?.history ?? []} mouseContainerRef={containerRef} icon={iconMap["docker"]} />

    </div>
  );
}