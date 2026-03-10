export function statusToValue(status: "operational" | "degraded" | "down") {
  if (status === "operational") return 1
  if (status === "degraded") return 0.8
  return 0
}