import { statusToValue } from "../utils/convertStatus"
import { updateHistory } from "../utils/getHistory"

export async function getFirebaseStatus() {
  const start = performance.now()

  const res = await fetch(
    "https://status.firebase.google.com/incidents.json"
  )
  const data = await res.json()
  const latency = performance.now() - start

  const incidents = Array.isArray(data) ? data : []
  const hasActiveCritical = incidents.some(
    (i: { end?: string; status_impact?: string }) =>
      !i.end &&
      (i.status_impact === "SERVICE_OUTAGE" ||
        i.status_impact === "SECURITY_ISSUE")
  )
  const hasActiveMinor = incidents.some(
    (i: { end?: string; status_impact?: string }) =>
      !i.end &&
      i.status_impact !== "SERVICE_OUTAGE" &&
      i.status_impact !== "SECURITY_ISSUE"
  )

  const status: "operational" | "degraded" | "down" = hasActiveCritical
    ? "down"
    : hasActiveMinor
      ? "degraded"
      : "operational"

  const history = updateHistory("firebase", statusToValue(status))

  return {
    platform: "Firebase",
    status,
    uptime: 99.99,
    latency: Math.round(latency),
    lastUpdated: new Date().toISOString(),
    history
  }
}
