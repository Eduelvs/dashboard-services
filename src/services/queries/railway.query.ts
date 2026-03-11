import { useQuery } from "@tanstack/react-query";
import { getRailwayStatus } from "../railway.service";

export function useRailwayStatusQuery() {
	return useQuery({
		queryKey: ["railway-status"],
		queryFn: getRailwayStatus,
		refetchInterval: 1000,
	});
}
