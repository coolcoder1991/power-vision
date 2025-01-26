export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return [
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    date.getFullYear(),
  ].join("-");
};

export const classNameToDevice = (className: string) => {
  const deviceName = className.split("-").pop();
  const regex = /device/;
  if (!deviceName) {
    throw new Error(`No device found in class name: ${className}`);
  } else {
    regex.test(deviceName)
      ? deviceName
      : () => {
          throw new Error(`No device found in class name: ${className}`);
        };
  }
  return deviceName;
};
