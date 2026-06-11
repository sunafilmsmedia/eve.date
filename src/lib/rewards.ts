// Pomme reward tracking — used by future Supabase tables / API routes.
// The UI on the landing page is purely informational.

export type PommeRewardProgress = {
  userId: string;
  subscriptionStatus: "active" | "inactive" | "cancelled";
  completedReservationsCount: number;
  eligibleMonthsCount: number;
  monthlyCompletedReservations: {
    month: string; // ISO year-month, e.g. "2026-06"
    count: number;
  }[];
  rewardUnlocked: boolean;
  rewardCreditAmount: number; // in CAD cents (e.g. 2500 = $25)
  rewardCreditUsed: boolean;
  rewardCreditExpiresAt?: string; // ISO 8601 timestamp
};

export const POMME_REWARD_RULES = {
  /** User must have active Pomme subscription */
  subscriptionRequired: true,
  /** Total confirmed-and-completed reservations needed */
  requiredReservations: 10,
  /** Minimum reservations per month to count the month as eligible */
  minReservationsPerEligibleMonth: 2,
  /** Total eligible months needed */
  requiredEligibleMonths: 3,
  /** Reward amount in CAD cents */
  rewardCreditCents: 2500,
  /** Days before credit expires after unlock */
  creditValidityDays: 90,
} as const;

/**
 * Determine whether a user has met all reward conditions.
 * Reservations that were cancelled, refunded, or not completed do not count.
 */
export function evaluateRewardEligibility(progress: PommeRewardProgress): {
  eligible: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  if (progress.subscriptionStatus !== "active") {
    reasons.push("Abonnement Pomme non actif");
  }
  if (progress.completedReservationsCount < POMME_REWARD_RULES.requiredReservations) {
    reasons.push(
      `${POMME_REWARD_RULES.requiredReservations - progress.completedReservationsCount} réservations restantes`
    );
  }
  if (progress.eligibleMonthsCount < POMME_REWARD_RULES.requiredEligibleMonths) {
    reasons.push(
      `${POMME_REWARD_RULES.requiredEligibleMonths - progress.eligibleMonthsCount} mois admissibles restants`
    );
  }

  return { eligible: reasons.length === 0, reasons };
}
