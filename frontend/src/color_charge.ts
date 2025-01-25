export const setColorFromCharge = (charge: number) => {
  let chargeColor = "dead";
  if (charge === 0) {
    chargeColor = "dead";
  } else if (charge <= 0.25) {
    chargeColor = "full25";
  } else if (charge <= 0.5) {
    chargeColor = "full50";
  } else if (charge <= 0.75) {
    chargeColor = "full75";
  } else {
    chargeColor = "full";
  }
  return chargeColor;
};
