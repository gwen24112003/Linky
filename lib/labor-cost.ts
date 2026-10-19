// Coût horaire de la main-d'œuvre : formule commune au calculateur et aux exemples de la page.
export interface LaborInputs {
  grossMonthly: number; // salaire brut mensuel (€)
  employerRate: number; // charges patronales, en % du brut
  dailyAllowance: number; // indemnités par jour travaillé : panier, trajet, transport (€)
  yearlyCosts: number; // véhicule, outillage, EPI, formation (€ par an)
  presenceHours: number; // heures de présence par an
  billableRate: number; // part des heures de présence réellement facturée (%)
  overheadRate: number; // frais généraux, en % du coût de revient
  marginRate: number; // marge visée, en % du prix de vente
}

export const DEFAULT_LABOR: LaborInputs = {
  grossMonthly: 2400,
  employerRate: 45,
  dailyAllowance: 15,
  yearlyCosts: 4000,
  presenceHours: 1607,
  billableRate: 75,
  overheadRate: 25,
  marginRate: 10,
};

export function laborCost(v: LaborInputs) {
  const workedDays = v.presenceHours / 7;
  const yearlyCost = v.grossMonthly * 12 * (1 + v.employerRate / 100) + v.dailyAllowance * workedDays + v.yearlyCosts;
  const billableHours = v.presenceHours * (v.billableRate / 100);
  const perPresenceHour = v.presenceHours > 0 ? yearlyCost / v.presenceHours : 0;
  const perBillableHour = billableHours > 0 ? yearlyCost / billableHours : 0;
  const withOverhead = perBillableHour * (1 + v.overheadRate / 100);
  const sellingRate = v.marginRate < 100 ? withOverhead / (1 - v.marginRate / 100) : 0;
  return { workedDays, yearlyCost, billableHours, perPresenceHour, perBillableHour, withOverhead, sellingRate };
}
