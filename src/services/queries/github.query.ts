import { useQuery } from "@tanstack/react-query"
import { getGithubStatus } from "../github.service"

export function useGithubStatusQuery() {
  return useQuery({
    queryKey: ["github-status"],
    queryFn: getGithubStatus,
    refetchInterval: 1000
  })
}