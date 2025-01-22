import { createDeviceBox, createDevice, getDevice } from "./main";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const showMenu = () => {
  document.getElementById("header-menu-dropdown")!.classList.toggle("show");
};

const addDevice = async () => {
  // Create a new defice with default settings
  // upload device to db. then get the new device and create a div in html.
  const resp = await createDevice();
  await delay(100);
  const device = await getDevice(resp.id);
  createDeviceBox(device);
};

document.querySelector("li")?.addEventListener("click", addDevice);
document.querySelector("img")!.addEventListener("click", showMenu);
