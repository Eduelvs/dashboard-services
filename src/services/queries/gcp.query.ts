import { useQuery } from "@tanstack/react-query";
import { getGcpStatus } from "../gcp.service";

export function useGcpStatusQuery() {
	return useQuery({
		queryKey: ["gcp-status"],
		queryFn: getGcpStatus,
		refetchInterval: 1000,
	});
}
