import { classNameToDevice } from "./helper";

export const toggleEditFields = (deviceBox: HTMLElement) => {
  const editBox = <HTMLElement>(
    deviceBox.getElementsByClassName("edit-charging-info-box")[0]
  );
  const chargingInfoBox = <HTMLElement>(
    deviceBox.getElementsByClassName("charging-info-box")[0]
  );
  const editButton = <HTMLElement>(
    deviceBox.getElementsByClassName("edit-device-button")[0]
  );
  const errorMessage = <HTMLElement>(
    deviceBox.getElementsByClassName("error-msg")[0]
  );
  const deviceName = classNameToDevice(deviceBox.id);
  const changesActionDiv = document.getElementById(
    `action-device-div-${deviceName}`
  );
  if (editButton.style.display != "none") {
    editButton.style.display = "none";
    chargingInfoBox.style.display = "none";
    errorMessage.style.display = "none";
    editBox.style.display = "grid";

    changesActionDiv!.style.display = "grid";
  } else {
    editButton.style.display = "block";
    chargingInfoBox.style.display = "block";
    editBox.style.display = "none";

    changesActionDiv!.style.display = "none";
  }
};

export const createEditForm = (deviceBox: HTMLElement) => {
  const deviceName = classNameToDevice(deviceBox.id);
  const editBox = document.createElement("div");
  editBox.className = "edit-charging-info-box";
  const levelText = document.createElement("p");

  const chargingLevel = createInputForm(deviceName, "chargingLevel");
  const lastChargedText = document.createElement("p");
  const lastCharged = createInputForm(deviceName, "lastCharged");
  const totalChargesText = document.createElement("p");
  const totalCharges = createInputForm(deviceName, "totalCharges");
  totalChargesText.innerHTML = "Total charges:";
  levelText.innerHTML = "Charging Level (%):";
  lastChargedText.innerHTML = "Last Charged:";
  editBox.appendChild(levelText);
  editBox.appendChild(chargingLevel);
  editBox.appendChild(lastChargedText);
  editBox.appendChild(lastCharged);
  editBox.appendChild(totalChargesText);
  editBox.appendChild(totalCharges);
  deviceBox.appendChild(editBox);
  editBox.style.display = "none";
};

const createInputForm = (name: string, fieldType: string) => {
  const newInput = document.createElement("input");
  newInput.className = `edit-device-${fieldType}-field`;
  newInput.id = `device-form-field-${fieldType}-${name}`;
  return newInput;
};
