import { statusToValue } from "../utils/convertStatus";
import { updateHistory } from "../utils/getHistory";

const DOCKER_REGISTRY_URL = "/api/docker-registry";

export async function getDockerStatus() {
	const start = performance.now();

	let res: Response | null = null;
	try {
		res = await fetch(DOCKER_REGISTRY_URL, { method: "HEAD" });
	} catch {
		res = null;
	}

	const latency = performance.now() - start;
	const isUp = res != null && (res.status === 200 || res.status === 401);
	const status: "operational" | "degraded" | "down" = isUp
		? "operational"
		: "down";
	const history = updateHistory("docker", statusToValue(status));

	return {
		platform: "Docker",
		status,
		uptime: "-",
		latency: Math.round(latency),
		lastUpdated: new Date().toISOString(),
		history,
	};
}
