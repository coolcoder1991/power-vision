import { createDeviceBox, createDevice, getDevice } from "./main";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const showMenu = () => {
  document.getElementById("header-menu-dropdown")!.classList.toggle("show");
};

const addDevice = async () => {
  const resp = await createDevice();
  await delay(500);
  const device = await getDevice(resp.id);
  createDeviceBox(device);
};
document.querySelector("button")?.addEventListener("click", addDevice);
document.querySelector("img")!.addEventListener("click", showMenu);
