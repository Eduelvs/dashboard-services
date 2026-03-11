import { statusToValue } from "../utils/convertStatus";
import { updateHistory } from "../utils/getHistory";

export async function getRailwayStatus() {
	const start = performance.now();

	const res = await fetch("https://status.railway.com/summary.json");
	const data = await res.json();
	const latency = performance.now() - start;

	const pageStatus = data.page?.status?.toUpperCase();
	const status: "operational" | "degraded" | "down" =
		pageStatus === "UP" || pageStatus === "OPERATIONAL"
			? "operational"
			: pageStatus === "DEGRADED" || pageStatus === "PARTIAL"
				? "degraded"
				: "down";

	const history = updateHistory("railway", statusToValue(status));

	return {
		platform: "Railway",
		status,
		uptime: 99.99,
		latency: Math.round(latency),
		lastUpdated: new Date().toISOString(),
		history,
	};
}
