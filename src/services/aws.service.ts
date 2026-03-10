import { statusToValue } from "../utils/convertStatus"
import { updateHistory } from "../utils/getHistory"

const AWS_RSS_URL = "https://status.aws.amazon.com/rss/all.rss"

/** Lê o feed RSS e determina se há incidentes recentes (últimos 7 dias). */
function parseRssStatus(xmlText: string): "operational" | "degraded" {
  try {
    const doc = new DOMParser().parseFromString(xmlText, "text/xml")
    const items = doc.querySelectorAll("item")
    const now = Date.now()
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
    const incidentKeywords = /disruption|impact|degradation|increased error|connectivity issues/i

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const titleEl = item.querySelector("title")
      const pubDateEl = item.querySelector("pubDate")
      const title = titleEl?.textContent?.trim() ?? ""
      const pubDateStr = pubDateEl?.textContent?.trim()
      if (!pubDateStr || !incidentKeywords.test(title)) continue

      const itemDate = new Date(pubDateStr).getTime()
      if (now - itemDate < sevenDaysMs) return "degraded"
    }
  } catch {
    // XML inválido: considerar só que o feed respondeu
  }
  return "operational"
}

export async function getAwsStatus() {
  const start = performance.now()

  const res = await fetch(AWS_RSS_URL, { method: "GET" }).catch(() => null)
  const latency = performance.now() - start

  if (res == null || !res.ok) {
    const history = updateHistory("aws", statusToValue("down"))
    return {
      platform: "Amazon Web Services",
      status: "down" as const,
      uptime: 99.99,
      latency: Math.round(latency),
      lastUpdated: new Date().toISOString(),
      history
    }
  }

  const xmlText = await res.text()
  const status = parseRssStatus(xmlText)
  const history = updateHistory("aws", statusToValue(status))

  return {
    platform: "Amazon Web Services",
    status,
    uptime: 99.99,
    latency: Math.round(latency),
    lastUpdated: new Date().toISOString(),
    history
  }
}
