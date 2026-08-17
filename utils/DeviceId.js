import { v4 as uuid } from "uuid";

export function getDeviceId() {
  let DeviceId = localStorage.getItem("DeviceId");

  if (!DeviceId) {
    DeviceId = uuid();
    localStorage.setItem("DeviceId", DeviceId);
  }

  return DeviceId;
}
