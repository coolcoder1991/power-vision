import { createDeviceBox, createDevice, getDevice } from "./main";

const showMenu = () => {
  document.getElementById("header-menu-dropdown")!.classList.toggle("show");
};

const addDevice = async () => {
  const resp = await createDevice();
  await getDevice(resp.id);
  const device = await getDevice(resp.id);
  createDeviceBox(device);
};
document.querySelector("button")?.addEventListener("click", addDevice);
document.querySelector("img")!.addEventListener("click", showMenu);
