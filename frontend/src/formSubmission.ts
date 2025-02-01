export const submitDeviceChanges = (deviceNumber: number) => {
  hideErrorMessage(deviceNumber);
  let chargingLevel = (<HTMLInputElement>(
    document.getElementById(
      `device-form-field-chargingLevel-device${deviceNumber}`
    )
  )).value;
  const chargeLevelValidated = validateCharging(chargingLevel);
  if (!chargeLevelValidated) {
    showErrorMessage(
      "Charging level not a valid percent. Please adjust and try again.",
      deviceNumber
    );
  }
};

const validateCharging = (chargingInput: string) => {
  const chargingNumber = Number(chargingInput);
  if (!isNaN(chargingNumber) && chargingNumber > 0 && chargingNumber <= 100) {
    console.log("charging ok!", chargingNumber);
    return true;
  } else {
    console.log("nope!");
  }
  return false;
};

const showErrorMessage = (errorMessageText: string, deviceNumber: number) => {
  const errorElement = document.getElementById(
    `error-msg-device${deviceNumber}`
  );
  errorElement!.innerHTML = errorMessageText;
  errorElement!.style.display = "block";
};

const hideErrorMessage = (deviceNumber: number) => {
  const errorElement = document.getElementById(
    `error-msg-device${deviceNumber}`
  );
  errorElement!.style.display = "none";
};
