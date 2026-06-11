// Édén reward tracking — used by future Supabase tables / API routes.
// The UI on the landing page is purely informational.

export type EdenRewardProgress = {
  userId: string;
  subscriptionStatus: "active" | "inactive" | "cancelled";
  completedReservationsCount: number;
  eligibleMonthsCount: number;
  monthlyCompletedReservations: {
    month: string; // ISO year-month, e.g. "2026-06"
    count: number;
  }[];
  rewardUnlocked: boolean;
  rewardCreditCents: number; // CAD cents (10000 = $100)
  rewardCreditUsed: boolean;
  rewardCreditExpiresAt?: string; // ISO 8601 timestamp
};

export const EDEN_REWARD_RULES = {
  /** User must have active Édén subscription */
  subscriptionRequired: true,
  /** Total confirmed-and-completed reservations needed */
  requiredReservations: 10,
  /** Minimum reservations per month to count the month as eligible */
  minReservationsPerEligibleMonth: 2,
  /** Total eligible months needed (= minimum active subscription) */
  requiredEligibleMonths: 4,
  /** Reward amount in CAD cents */
  rewardCreditCents: 10000,
  /** Days before credit expires after unlock */
  creditValidityDays: 90,
} as const;

/**
 * Determine whether a user has met all reward conditions.
 * Reservations that were cancelled, refunded, or not completed do not count.
 */
export function evaluateRewardEligibility(progress: EdenRewardProgress): {
  eligible: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  if (progress.subscriptionStatus !== "active") {
    reasons.push("Abonnement Édén non actif");
  }
  if (progress.completedReservationsCount < EDEN_REWARD_RULES.requiredReservations) {
    reasons.push(
      `${EDEN_REWARD_RULES.requiredReservations - progress.completedReservationsCount} réservations restantes`
    );
  }
  if (progress.eligibleMonthsCount < EDEN_REWARD_RULES.requiredEligibleMonths) {
    reasons.push(
      `${EDEN_REWARD_RULES.requiredEligibleMonths - progress.eligibleMonthsCount} mois admissibles restants`
    );
  }

  return { eligible: reasons.length === 0, reasons };
}
