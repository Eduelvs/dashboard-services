export function updateHistory(service: string, value: number) {
  const key = `history-${service}`

  const stored = localStorage.getItem(key)

  const history = stored ? JSON.parse(stored) : []

  history.push(value)

  if (history.length > 30) history.shift()

  localStorage.setItem(key, JSON.stringify(history))

  return history
}