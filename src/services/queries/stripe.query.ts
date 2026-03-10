import { useQuery } from "@tanstack/react-query"
import { getStripeStatus } from "../stripe.service"

export function useStripeStatusQuery() {
  return useQuery({
    queryKey: ["stripe-status"],
    queryFn: getStripeStatus,
    refetchInterval: 1000
  })
}
