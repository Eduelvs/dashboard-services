import { useQuery } from "@tanstack/react-query";
import { getFirebaseStatus } from "../firebase.service";

export function useFirebaseStatusQuery() {
	return useQuery({
		queryKey: ["firebase-status"],
		queryFn: getFirebaseStatus,
		refetchInterval: 1000,
	});
}
