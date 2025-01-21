// const API_URL = process.env.API_URL;
const API_URL = "localhost";
const showDeviceDetails = (deviceDetails: string) => {
  const detailsBox = document.getElementById(`device-details-${deviceDetails}`);
  const devicesContainer = document.getElementById("devices");
  const deviceTitle = document.getElementById(
    `device-details-title-${deviceDetails}`
  );
  if (detailsBox.style.display !== "grid") {
    detailsBox.style.display = "grid";
    devicesContainer.style.display = "none";
    deviceTitle.style.display = "block";
  } else {
    detailsBox.style.display = "none";
    devicesContainer.style.display = "grid";
    deviceTitle.style.display = "none";
  }
  return false;
};

const hideDeviceDetails = (event) => {
  const deviceDetailsTitle = event.target.id;

  const deviceName = deviceDetailsTitle.replace("device-details-title-", "");
  const detailsBox = document.getElementById(`device-details-${deviceName}`);
  const devicesContainer = document.getElementById("devices");
  const deviceTitle = document.getElementById(deviceDetailsTitle);
  if (detailsBox.style.display !== "grid") {
    detailsBox.style.display = "grid";
    devicesContainer.style.display = "none";
    deviceTitle.style.display = "block";
  } else {
    detailsBox.style.display = "none";
    devicesContainer.style.display = "grid";
    deviceTitle.style.display = "none";
  }
  return false;
};

const showMenu = () => {
  document.getElementById("header-menu-dropdown").classList.toggle("show");
};

window.onclick = function (event) {
  if (!event.target.matches(".hamburg-list")) {
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

const invokeShowDetails = (event) => {
  const elementId = event.target.id;
  showDeviceDetails(elementId);
};

const loadDevices = async () => {
  const allDevices = await getDevices();
  if (allDevices.length > 0) {
    allDevices.map((device: Device) => {
      createDeviceBox(device);
    });
  }
};

const addDevice = async () => {
  const resp = await createDevice();
  const device = await getDevice(resp.id);
  createDeviceBox(device);
};

const createDeviceBox = (device: Device) => {
  const deviceSuffix = Date.now();
  console.log(`adding device device${deviceSuffix}`);
  const newDiv = document.createElement("div");
  newDiv.id = `device${deviceSuffix}`;
  newDiv.className = "device-box full";

  newDiv.addEventListener("click", (event) => {
    invokeShowDetails(event);
  });
  const newSpan = document.createElement("span");
  newSpan.id = "newSpan";
  newSpan.innerHTML = device.name;
  newSpan.style.pointerEvents = "none";
  newDiv.appendChild(newSpan);
  const devices = document.getElementById("devices");
  devices.appendChild(newDiv);
  createDetailsTitle(deviceSuffix, device.name);
  createDetails(deviceSuffix, device);
};

const createDetailsTitle = (deviceNumber: number, deviceName: string) => {
  const newDetailsTitle = document.createElement("div");
  newDetailsTitle.id = `device-details-title-device${deviceNumber}`;
  newDetailsTitle.className = "device-details-title-box full";
  newDetailsTitle.addEventListener("click", (event) => {
    hideDeviceDetails(event);
  });
  const titleDeviceName = document.createElement("p");
  titleDeviceName.innerHTML = deviceName;
  newDetailsTitle.appendChild(titleDeviceName);
  document.getElementById("article").appendChild(newDetailsTitle);
};

const createDetails = (deviceNumber: number, device: Device) => {
  const newDetails = document.createElement("div");
  const chargingInfo = document.createElement("div");
  chargingInfo.className = "charging-info-box";
  newDetails.className = "details-box full";
  const chargeLevel = document.createElement("p");
  const lastCharged = document.createElement("p");
  const totalCharges = document.createElement("p");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  chargeLevel.innerHTML = `Charrge Level: ${device.battery_level}`;
  lastCharged.innerHTML = `Last Charged: ${
    new Date().toISOString().split("T")[0]
  }`;
  totalCharges.innerHTML = `Total Charges: ${device.number_charges}`;
  deleteButton.innerHTML = "delete";
  deleteButton.className = "delete-device-button";
  deleteButton.id = `delete-device-button-device${deviceNumber}`;
  deleteButton.onclick = deleteDevice;
  editButton.className = "edit-device-button";
  editButton.innerHTML = "edit";
  editButton.id = `edit-device-button-device${deviceNumber}`;

  const article = document.getElementById("article");
  const numDevices = document.getElementsByClassName("device-box").length;
  newDetails.id = `device-details-device${deviceNumber}`;

  chargingInfo.appendChild(chargeLevel);
  chargingInfo.appendChild(lastCharged);
  chargingInfo.appendChild(totalCharges);
  newDetails.append(chargingInfo);
  newDetails.appendChild(editButton);
  newDetails.appendChild(deleteButton);

  article.appendChild(newDetails);
};

const deleteDevice = (event) => {
  // newDetailsTitle.addEventListener("click", (event) => {
  //   hideDeviceDetails(event);
  // });
  const deviceId = event.target.id;
  const deviceName = deviceId.replace("delete-device-button-", "");
  const device = document.getElementById(deviceName);
  const detailsTitle = document.getElementById(
    `device-details-title-${deviceName}`
  );
  const deviceDetails = document.getElementById(`device-details-${deviceName}`);
  const devicesContainer = document.getElementById("devices");
  if (deviceDetails.style.display !== "grid") {
    deviceDetails.style.display = "grid";
    devicesContainer.style.display = "none";
    detailsTitle.style.display = "block";
  } else {
    deviceDetails.style.display = "none";
    devicesContainer.style.display = "grid";
    detailsTitle.style.display = "none";
  }
  console.log(`deleting device ${deviceName}`);
  detailsTitle.remove();
  deviceDetails.remove();
  device.remove();
};

const getAccounts = async () => {
  const url = `http://${API_URL}:3000/account/admin`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const createDevice = async (): Promise<Device> => {
  const url = `http://${API_URL}:3000/device`;
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getDevice = async (device_id): Promise<Device> => {
  const url = `http://${API_URL}:3000/device/${device_id}`;
  const options = {
    method: "GET",
    headers: { "content-type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    const data = response.json();
    return data;
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
}

document.addEventListener("DOMContentLoaded", loadDevices, false);
