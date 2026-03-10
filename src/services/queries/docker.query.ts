import { useQuery } from "@tanstack/react-query"
import { getDockerStatus } from "../docker.service"

export function useDockerStatusQuery() {
  return useQuery({
    queryKey: ["docker-status"],
    queryFn: getDockerStatus,
    refetchInterval: 1000
  })
}
