import { classNameToDevice } from "./helper";

export const showEditFields = (deviceBox: HTMLElement) => {
  const editBox = <HTMLElement>(
    deviceBox.getElementsByClassName("edit-charging-info-box")[0]
  );
  const chargingInfoBox = <HTMLElement>(
    deviceBox.getElementsByClassName("charging-info-box")[0]
  );
  const editButton = <HTMLElement>(
    deviceBox.getElementsByClassName("edit-device-button")[0]
  );
  editButton.style.display = "none";
  chargingInfoBox.style.display = "none";
  editBox.style.display = "grid";
  const deviceName = classNameToDevice(deviceBox.id);
  const changesActionDiv = document.getElementById(
    `action-device-div-${deviceName}`
  );
  changesActionDiv!.style.display = "flex";
};

export const createEditForm = (deviceBox: HTMLElement) => {
  const editBox = document.createElement("div");
  editBox.className = "edit-charging-info-box";
  const levelText = document.createElement("p");
  const chargingLevel = document.createElement("input");
  const lastChargedText = document.createElement("p");
  const lastCharged = document.createElement("input");
  const totalChargesText = document.createElement("p");
  const totalCharges = document.createElement("input");
  totalChargesText.innerHTML = "Total charges:";
  levelText.innerHTML = "Charging Level:";
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

export const submitDeviceChanges = () => {
  console.log("submitted!");
};

export const discardDeviceChanges = () => {
  console.log("discarded!");
};
