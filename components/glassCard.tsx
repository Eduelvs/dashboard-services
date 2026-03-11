import LiquidGlass from "@nkzw/liquid-glass";
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { formatDate } from "../src/utils";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

interface GlassCardProps {
	name: string;
	status: string;
	top: number;
	left: number;
	uptime: number | string;
	latency: number;
	lastUpdated: string;
	history: Record<string, number>;
	className?: string;
	mouseContainerRef?: React.RefObject<HTMLDivElement | null>;
	icon: React.ReactNode;
}

function GlassCard({
	name,
	status,
	top,
	left,
	uptime,
	latency,
	lastUpdated,
	history,
	className,
	mouseContainerRef,
	icon,
}: GlassCardProps) {
	const ownRef = useRef<HTMLDivElement>(null);
	const containerRef = mouseContainerRef ?? ownRef;
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setReady(true), 120);
		return () => clearTimeout(t);
	}, []);

	const isHealthy =
		status?.toLowerCase() === "operational" ||
		status?.toLowerCase() === "ok" ||
		status?.toLowerCase() === "up";
	const statusTranslation = {
		operational: "Operacional",
		ok: "OK",
		up: "Ativo",
		down: "Inativo",
		maintenance: "Manutenção",
		degraded: "Degradado",
	};

	const liquidGlass = (
		<LiquidGlass
			mouseContainer={containerRef}
			elasticity={0}
			displacementScale={28}
			aberrationIntensity={1}
			borderRadius={24}
			style={{
				position: "fixed",
				top: `${top}%`,
				left: `${left}%`,
			}}
		>
			<div className="w-72 text-shadow-lg p-2">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2 h-full">
						{icon}
						<h3 className="text-xl font-semibold flex items-center justify-center">
							{name}
						</h3>
					</div>
					<div className="flex items-center space-x-3">
						<div
							className={`w-2 h-2 rounded-full flex items-center justify-center text-white font-semibold ${
								isHealthy
									? "bg-emerald-500/80 backdrop-blur animate-pulse"
									: "bg-amber-500/80 backdrop-blur animate-pulse"
							}`}
							title={
								statusTranslation[status as keyof typeof statusTranslation]
							}
						></div>
						<div>
							<p className="text-sm text-white/90">
								{statusTranslation[status as keyof typeof statusTranslation]}
							</p>
						</div>
					</div>
				</div>
				<div className="space-y-3">
					<div className="pt-2 space-y-2">
						<div className="flex justify-between">
							<span className="text-sm text-white/90">Status:</span>
							<span className="text-sm">
								{statusTranslation[status as keyof typeof statusTranslation]}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-white/90">Uptime:</span>
							<span className="text-sm">
								{typeof uptime === "number" ? `${uptime}%` : uptime}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-white/90">Latência:</span>
							<span className="text-sm">
								{typeof latency === "number" ? `${latency}ms` : latency}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-white/90">Atualizado:</span>
							<span className="text-sm">{formatDate(lastUpdated)}</span>
						</div>
					</div>
				</div>
				<div className="mt-4 h-32 min-w-0">
					<Line
						data={{
							labels: Object.keys(history),
							datasets: [
								{
									label: "Histórico",
									data: Object.values(history),
									borderColor: "rgba(255,255,255,0.9)",
									backgroundColor: "rgba(255,255,255,0.08)",
									fill: true,
									tension: 0.4,
									pointRadius: 0,
									borderWidth: 2,
								},
							],
						}}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							plugins: {
								legend: { display: false },
							},
							scales: {
								x: {
									grid: { display: false },
									ticks: { color: "rgba(255, 255, 255, 1)", maxTicksLimit: 6 },
									title: {
										display: true,
										text: "Tempo",
										color: "rgba(255, 255, 255, 1)",
									},
								},
								y: {
									grid: { display: false },
									ticks: { color: "rgba(255, 255, 255, 1)" },
									title: {
										display: true,
										text: "Latência",
										color: "rgba(255, 255, 255, 1)",
									},
								},
							},
						}}
					/>
				</div>
			</div>
		</LiquidGlass>
	);

	if (!ready) {
		if (mouseContainerRef) return null;
		return (
			<div
				ref={ownRef}
				className={`relative z-10 w-full min-h-screen h-screen overflow-hidden ${className ?? ""}`}
			/>
		);
	}

	if (mouseContainerRef) {
		return <Fragment>{liquidGlass}</Fragment>;
	}

	return (
		<div
			ref={ownRef}
			className={`relative z-10 w-full min-h-screen h-screen overflow-hidden ${className ?? ""}`}
		>
			{liquidGlass}
		</div>
	);
}

export { GlassCard };
