import { useQuery } from "@tanstack/react-query"
import { getAwsStatus } from "../aws.service"

export function useAwsStatusQuery() {
  return useQuery({
    queryKey: ["aws-status"],
    queryFn: getAwsStatus,
    refetchInterval: 1000
  })
}
