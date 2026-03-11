import { useQuery } from "@tanstack/react-query";
import { getCloudflareStatus } from "../cloudflare.service";

export function useCloudflareStatusQuery() {
	return useQuery({
		queryKey: ["cloudflare-status"],
		queryFn: getCloudflareStatus,
		refetchInterval: 1000,
	});
}
