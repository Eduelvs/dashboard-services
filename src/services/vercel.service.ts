import { statusToValue } from "../utils/convertStatus";
import { updateHistory } from "../utils/getHistory";

const INDICATOR_MAP: Record<string, "operational" | "degraded" | "down"> = {
	none: "operational",
	minor: "degraded",
	major: "down",
	critical: "down",
};

export async function getVercelStatus() {
	const start = performance.now();

	const res = await fetch("https://www.vercel-status.com/api/v2/status.json");
	const data = await res.json();
	const latency = performance.now() - start;

	const status =
		INDICATOR_MAP[data.status?.indicator ?? "none"] ?? "operational";
	const history = updateHistory("vercel", statusToValue(status));

	return {
		platform: "Vercel",
		status,
		uptime: 99.99,
		latency: Math.round(latency),
		lastUpdated: new Date().toISOString(),
		history,
	};
}
