// const API_URL = process.env.API_URL;

import { setColorFromCharge } from "./color_charge";
import {
  createEditForm,
  toggleEditFields,
  submitDeviceChanges,
} from "./edit_device";
import { classNameToDevice, formatDate } from "./helper";

// const apiUrl = import.meta.env.API_URL;

const API_URL = "localhost";
const showDeviceDetails = (deviceDetails: string) => {
  const detailsBox = document.getElementById(`device-details-${deviceDetails}`);
  const devicesContainer = document.getElementById("devices");
  const deviceTitle = document.getElementById(
    `device-details-title-${deviceDetails}`
  );
  if (detailsBox!.style.display !== "grid") {
    detailsBox!.style.display = "grid";
    devicesContainer!.style.display = "none";
    deviceTitle!.style.display = "block";
  } else {
    detailsBox!.style.display = "none";
    devicesContainer!.style.display = "grid";
    deviceTitle!.style.display = "none";
  }
  return false;
};

const hideDeviceDetails = (event: MouseEvent) => {
  const deviceDetailsTitle = (<HTMLElement>event.target).id;
  const deviceName = classNameToDevice(deviceDetailsTitle);
  const detailsBox = document.getElementById(`device-details-${deviceName}`);
  const devicesContainer = document.getElementById("devices");
  const deviceTitle = document.getElementById(deviceDetailsTitle);
  if (detailsBox!.style.display !== "grid") {
    detailsBox!.style.display = "grid";
    devicesContainer!.style.display = "none";
    deviceTitle!.style.display = "block";
  } else {
    detailsBox!.style.display = "none";
    devicesContainer!.style.display = "grid";
    deviceTitle!.style.display = "none";
  }
  return false;
};

window.onclick = (event: MouseEvent) => {
  if (!(<HTMLElement>event.target).matches(".hamburg-list")) {
    let dropdowns = document.getElementsByClassName("header-menu-dropdown-box");
    let i: number;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const invokeShowDetails = (event: MouseEvent) => {
  const elementId = (<HTMLElement>event.target).id;
  showDeviceDetails(elementId);
};

const loadDevices = async () => {
  const allDevices = await getDevices();
  if (allDevices.length > 0) {
    allDevices.map((device: Device) => {
      let device_uid = createDeviceBox(device);
      sessionStorage.setItem(device_uid, device.id.toString());
    });
  }
};

export const createDeviceBox = (device: Device): string => {
  // creates a new device box, along with details and details-title
  const deviceSuffix = Date.now();
  const newDiv = document.createElement("div");
  const device_uid = `device${deviceSuffix}`;
  newDiv.id = `device${deviceSuffix}`;
  const chargeColorClass = setColorFromCharge(device.battery_level);
  newDiv.className = `device-box ${chargeColorClass}`;

  newDiv.addEventListener("click", (event: MouseEvent) => {
    invokeShowDetails(event);
  });
  const newSpan = document.createElement("span");
  newSpan.id = "newSpan";
  newSpan.innerHTML = device.name;
  newSpan.style.pointerEvents = "none";
  newDiv.appendChild(newSpan);
  const devices = document.getElementById("devices");
  devices!.appendChild(newDiv);
  createDetailsTitle(deviceSuffix, device.name, device.battery_level);
  createDetails(deviceSuffix, device);
  return device_uid;
};

const createDetailsTitle = (
  deviceNumber: number,
  deviceName: string,
  batteryLevel: number
) => {
  const chargeColorClass = setColorFromCharge(batteryLevel);
  const newDetailsTitle = document.createElement("div");
  newDetailsTitle.id = `device-details-title-device${deviceNumber}`;
  newDetailsTitle.className = `device-details-title-box ${chargeColorClass}`;
  newDetailsTitle.addEventListener("click", (event: MouseEvent) => {
    hideDeviceDetails(event);
  });
  const titleDeviceName = document.createElement("p");
  titleDeviceName.innerHTML = deviceName;
  newDetailsTitle.appendChild(titleDeviceName);
  document.getElementById("article")!.appendChild(newDetailsTitle);
};

const createDetails = (deviceNumber: number, device: Device) => {
  const colorChargeClass = setColorFromCharge(device.battery_level);
  const newDetails = document.createElement("div");
  const chargingInfo = document.createElement("div");
  chargingInfo.className = "charging-info-box";
  newDetails.className = `details-box ${colorChargeClass}`;
  const chargeLevel = document.createElement("p");
  const lastCharged = document.createElement("p");
  const totalCharges = document.createElement("p");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const submitButton = document.createElement("button");
  const discardButton = document.createElement("button");
  const changesActionDiv = document.createElement("div");

  chargeLevel.innerHTML = `Charge Level: ${device.battery_level * 100}%`;

  lastCharged.innerHTML = `Last Charged: ${formatDate(device.last_charged)}`;
  totalCharges.innerHTML = `Total Charges: ${device.number_charges}`;
  deleteButton.innerHTML = "delete";
  deleteButton.className = "action-device-button delete";
  deleteButton.id = `delete-device-button-device${deviceNumber}`;
  deleteButton.onclick = deleteDevice;
  editButton.className = "edit-device-button";
  editButton.innerHTML = "edit";
  editButton.id = `edit-device-button-device${deviceNumber}`;
  submitButton.innerHTML = "submit";
  submitButton.id = `submit-device-button-device${deviceNumber}`;
  submitButton.className = "action-device-button default";
  submitButton.onclick = submitDeviceChanges;
  discardButton.innerHTML = "discard changes";
  discardButton.id = `discard-device-button-device${deviceNumber}`;
  discardButton.addEventListener("click", () => {
    toggleEditFields(newDetails);
  });
  discardButton.className = "action-device-button default-action";
  changesActionDiv.style.display = "none";
  changesActionDiv.id = `action-device-div-device${deviceNumber}`;
  changesActionDiv.className = "action-device-box";

  editButton.addEventListener("click", () => {
    toggleEditFields(newDetails);
  });

  const article = document.getElementById("article");
  newDetails.id = `device-details-device${deviceNumber}`;

  chargingInfo.appendChild(chargeLevel);
  chargingInfo.appendChild(lastCharged);
  chargingInfo.appendChild(totalCharges);
  newDetails.append(chargingInfo);
  newDetails.appendChild(editButton);
  newDetails.appendChild(changesActionDiv);
  changesActionDiv.appendChild(deleteButton);
  changesActionDiv.appendChild(submitButton);
  changesActionDiv.appendChild(discardButton);

  article!.appendChild(newDetails);
  createEditForm(newDetails);
};

const deleteDevice = (event: MouseEvent) => {
  const deviceId = (<HTMLElement>event.target).id;
  const deviceName = classNameToDevice(deviceId);
  const device = document.getElementById(deviceName);
  const detailsTitle = document.getElementById(
    `device-details-title-${deviceName}`
  );
  const deviceDetails = document.getElementById(`device-details-${deviceName}`);
  const devicesContainer = document.getElementById("devices");
  if (deviceDetails!.style.display !== "grid") {
    deviceDetails!.style.display = "grid";
    devicesContainer!.style.display = "none";
    detailsTitle!.style.display = "block";
  } else {
    deviceDetails!.style.display = "none";
    devicesContainer!.style.display = "grid";
    detailsTitle!.style.display = "none";
  }

  detailsTitle!.remove();
  deviceDetails!.remove();
  device!.remove();
  const retreived_device = sessionStorage.getItem(deviceName);
  if (retreived_device) {
    removeDevice(Number(retreived_device));
    sessionStorage.removeItem(deviceName);
  }
};

export const createDevice = async (): Promise<Device> => {
  const url = `http://${API_URL}:3000/device`;
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not create device");
  }
};

const getDevices = async () => {
  const url = `http://${API_URL}:3000/device`;
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getDevice = async (device_id: number): Promise<Device> => {
  const url = `http://${API_URL}:3000/device/${device_id}`;
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Could not get device ${device_id}`);
  }
};

const removeDevice = async (device_id: number) => {
  const url = `http://${API_URL}:3000/device/${device_id}`;
  const options = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: undefined,
  };

  try {
    const response = await fetch(url, options);
    await response.json();
  } catch (error) {
    console.error(error);
  }
};
interface Device {
  id: number;
  name: string;
  model?: string;
  account_id: number;
  battery_id?: number;
  battery_level: number;
  number_charges: number;
  last_charged: string;
}

document.addEventListener("DOMContentLoaded", loadDevices, { once: true });
