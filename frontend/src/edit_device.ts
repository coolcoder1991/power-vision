export const showEditFields = (deviceBox: HTMLElement) => {
  const editBox = <HTMLElement>(
    deviceBox.getElementsByClassName("edit-charging-info-box")[0]
  );
  const currentInfo = deviceBox.querySelectorAll("p");
  currentInfo.forEach((p_tag) => {
    p_tag.style.display = "none";
  });
  editBox.style.display = "flex";
};

export const createEditForm = (deviceBox: HTMLElement) => {
  const chargingInfo = deviceBox.getElementsByClassName("charging-info-box")[0];
  const editBox = document.createElement("div");
  editBox.className = "edit-charging-info-box";
  const chargingLevel = document.createElement("input");
  const lastCharged = document.createElement("input");
  const totalCharges = document.createElement("input");
  editBox.appendChild(chargingLevel);
  editBox.appendChild(lastCharged);
  editBox.appendChild(totalCharges);
  chargingInfo.appendChild(editBox);
  editBox.style.display = "none";
};
