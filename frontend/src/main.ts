// const API_URL = process.env.API_URL;
// const apiUrl = import.meta.env.API_URL;
console.log("this is apiurl: ", import.meta.env.VITE_API_URL);

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

  const deviceName = deviceDetailsTitle.replace("device-details-title-", "");
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

// export const showMenu = () => {
//   document.getElementById("header-menu-dropdown").classList.toggle("show");
// };

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
      console.log(device);
      let device_uid = createDeviceBox(device);
      sessionStorage.setItem(device_uid, device.id.toString());
    });
  }
};

export const createDeviceBox = (device: Device): string => {
  // creates a new device box, along with details and details-title
  const deviceSuffix = Date.now();
  console.log(`adding device device${deviceSuffix}`);
  const newDiv = document.createElement("div");
  const device_uid = `device${deviceSuffix}`;
  newDiv.id = `device${deviceSuffix}`;
  newDiv.className = "device-box full";

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
  createDetailsTitle(deviceSuffix, device.name);
  createDetails(deviceSuffix, device);
  return device_uid;
};

const createDetailsTitle = (deviceNumber: number, deviceName: string) => {
  const newDetailsTitle = document.createElement("div");
  newDetailsTitle.id = `device-details-title-device${deviceNumber}`;
  newDetailsTitle.className = "device-details-title-box full";
  newDetailsTitle.addEventListener("click", (event: MouseEvent) => {
    hideDeviceDetails(event);
  });
  const titleDeviceName = document.createElement("p");
  titleDeviceName.innerHTML = deviceName;
  newDetailsTitle.appendChild(titleDeviceName);
  document.getElementById("article")!.appendChild(newDetailsTitle);
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
  newDetails.id = `device-details-device${deviceNumber}`;

  chargingInfo.appendChild(chargeLevel);
  chargingInfo.appendChild(lastCharged);
  chargingInfo.appendChild(totalCharges);
  newDetails.append(chargingInfo);
  newDetails.appendChild(editButton);
  newDetails.appendChild(deleteButton);

  article!.appendChild(newDetails);
};

const deleteDevice = (event: MouseEvent) => {
  const deviceId = (<HTMLElement>event.target).id;
  const deviceName = deviceId.replace("delete-device-button-", "");
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
  console.log(`deleting device ${deviceName}`);

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
    console.log(data);
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
    console.log(data);
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
    console.log(response);
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
    const data = await response.json();
    console.log(data);
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
