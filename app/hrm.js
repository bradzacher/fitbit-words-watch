import { me as appbit } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import * as document from "document";
import { HeartRateSensor } from "heart-rate";

let DISPLAY_ON = display.on;

const GROUP = document.getElementById('hrm');
const TEXT = GROUP.getElementById('widget-text');

let HRM;
let BODY;

if (BodyPresenceSensor) {
  BODY = new BodyPresenceSensor();
}

function updateHRMState() {
  if (!HRM) {
    return;
  }
  
  const isBodyPresent = (BODY && BODY.present) || true;
  const isDisplayOn = display.on && !display.aodActive
 
  if (isBodyPresent && isDisplayOn) {
    HRM.start();
    GROUP.animate('enable');
  } else {
    HRM.stop();
    GROUP.animate('disable');
  }
}

export function initHRM() {
  if (!HeartRateSensor || !appbit.permissions.granted("access_heart_rate")) {
    return;
  }
  
  HRM = new HeartRateSensor();
  
  HRM.addEventListener("reading", () => {
    TEXT.text = HRM.heartRate;
  });
  
  if (BODY) {
    BODY.addEventListener("reading", updateHRMState);
    BODY.start();
  }
  display.addEventListener('change', updateHRMState);
  
  updateHRMState();
}