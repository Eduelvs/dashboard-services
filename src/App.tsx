import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { FaAws, FaDocker, FaGithub, FaStripe } from "react-icons/fa";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import {
	SiCloudflare,
	SiDatadog,
	SiFirebase,
	SiGooglecloud,
	SiRailway,
	SiVercel,
} from "react-icons/si";
import { GlassButton, GlassCard } from "../components";
import {
	useAwsStatusQuery,
	useCloudflareStatusQuery,
	useDatadogStatusQuery,
	useDockerStatusQuery,
	useFirebaseStatusQuery,
	useGcpStatusQuery,
	useGithubStatusQuery,
	useRailwayStatusQuery,
	useStripeStatusQuery,
	useVercelStatusQuery,
} from "./services/queries";

type ViewMode = "grid" | "line";

type StatusData = {
	status: string;
	uptime: number | string;
	latency: number;
	lastUpdated: string;
	history: number[] | Record<string, number>;
};

function toHistoryRecord(
	history: number[] | Record<string, number> | undefined,
): Record<string, number> {
	if (history == null) return {};
	if (Array.isArray(history))
		return Object.fromEntries(history.map((v, i) => [String(i), v]));
	return history;
}

const iconMap: Record<string, ReactNode> = {
	github: <FaGithub size={24} />,
	aws: <FaAws size={24} />,
	stripe: <FaStripe size={24} />,
	docker: <FaDocker size={24} />,
	vercel: <SiVercel size={24} />,
	railway: <SiRailway size={24} />,
	cloudflare: <SiCloudflare size={24} />,
	datadog: <SiDatadog size={24} />,
	firebase: <SiFirebase size={24} />,
	gcp: <SiGooglecloud size={24} />,
};

export default function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isGrid, setIsGrid] = useState(true);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");

	const { data: githubStatus } = useGithubStatusQuery();
	const { data: awsStatus } = useAwsStatusQuery();
	const { data: stripeStatus } = useStripeStatusQuery();
	const { data: dockerStatus } = useDockerStatusQuery();
	const { data: vercelStatus } = useVercelStatusQuery();
	const { data: railwayStatus } = useRailwayStatusQuery();
	const { data: cloudflareStatus } = useCloudflareStatusQuery();
	const { data: datadogStatus } = useDatadogStatusQuery();
	const { data: firebaseStatus } = useFirebaseStatusQuery();
	const { data: gcpStatus } = useGcpStatusQuery();

	const services: { key: string; name: string; data: StatusData | undefined }[] =
		[
			{ key: "github", name: githubStatus?.platform ?? "GitHub", data: githubStatus},
			{ key: "aws", name: "Amazon Web", data: awsStatus },
			{ key: "stripe", name: "Stripe", data: stripeStatus },
			{ key: "docker", name: "Docker", data: dockerStatus },
			{ key: "vercel", name: "Vercel", data: vercelStatus },
			{ key: "railway", name: "Railway", data: railwayStatus },
			{ key: "cloudflare", name: "Cloudflare", data: cloudflareStatus },
			{ key: "datadog", name: "Datadog", data: datadogStatus },
			{ key: "firebase", name: "Firebase", data: firebaseStatus },
			{ key: "gcp", name: "Google Cloud", data: gcpStatus },
		];

	const cols = 5;
	const visibleServices = isGrid ? services : services.slice(0, 5);
	const getPosition = (index: number) => {
		if (isGrid) {
			const row = Math.floor(index / cols);
			const col = index % cols;
			return {
				top: row === 0 ? 35 : 75,
				left: 11 + col * 19,
			};
		}
		return {
			top: 50,
			left: 11 + index * 19,
		};
	};

	return (
		<div
			ref={containerRef}
			className="relative w-full min-h-screen h-screen overflow-visible"
		>
			<img
				src="/img/image-like.jpg"
				alt=""
				className="absolute inset-0 w-full h-full object-cover object-center z-0"
			/>

			<AnimatePresence mode="wait">
				<motion.div
					key={viewMode}
					initial={{ opacity: 0.8, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0.8, scale: 0.98 }}
					transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
					className="absolute inset-0"
				>
					{visibleServices.map((svc, index) => {
						const pos = getPosition(index);
						return (
							<GlassCard
								key={svc.key}
								name={svc.name}
								status={svc.data?.status ?? ""}
								top={pos.top}
								left={pos.left}
								uptime={svc.data?.uptime ?? 0}
								latency={svc.data?.latency ?? 0}
								lastUpdated={svc.data?.lastUpdated ?? ""}
								history={toHistoryRecord(svc.data?.history)}
								mouseContainerRef={containerRef}
								icon={iconMap[svc.key]}
							/>
						);
					})}
				</motion.div>
			</AnimatePresence>
			<GlassButton top={7} left={50}>
				<div className="relative flex items-center gap-1 p-0.5 rounded-full bg-transparent">
					<button
						type="button"
						onClick={() => {
							setViewMode("grid");
							setIsGrid(true);
						}}
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
						onClick={() => {
							setViewMode("line");
							setIsGrid(false);
						}}
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
							transform:
								viewMode === "line"
									? "translateX(calc(100% + 4px))"
									: "translateX(4px)",
						}}
						aria-hidden
					/>
				</div>
			</GlassButton>
		</div>
	);
}
