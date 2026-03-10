import { useQuery } from "@tanstack/react-query"
import { getVercelStatus } from "../vercel.service"

export function useVercelStatusQuery() {
  return useQuery({
    queryKey: ["vercel-status"],
    queryFn: getVercelStatus,
    refetchInterval: 1000
  })
}
