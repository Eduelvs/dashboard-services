import { statusToValue } from "../utils/convertStatus"
import { updateHistory } from "../utils/getHistory"

export async function getGithubStatus() {
  const start = performance.now()

  const res = await fetch(
    "https://www.githubstatus.com/api/v2/status.json"
  )

  const latency = performance.now() - start

  const data = await res.json()

  const indicatorMap: Record<string, "operational" | "degraded" | "down"> = {
    none: "operational",
    minor: "degraded",
    major: "down",
    critical: "down"
  }

  const status = indicatorMap[data.status.indicator] ?? "operational"

  const history = updateHistory("github", statusToValue(status))

  return {
    platform: "GitHub",
    status,
    uptime: 99.99,
    latency: Math.round(latency),
    lastUpdated: new Date().toISOString(),
    history
  }
}