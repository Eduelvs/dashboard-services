import { useQuery } from "@tanstack/react-query";
import { getDatadogStatus } from "../datadog.service";

export function useDatadogStatusQuery() {
	return useQuery({
		queryKey: ["datadog-status"],
		queryFn: getDatadogStatus,
		refetchInterval: 1000,
	});
}
