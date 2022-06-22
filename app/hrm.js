import { me } from 'appbit';
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';
import * as document from 'document';
import { HeartRateSensor } from 'heart-rate';

const GROUP = document.getElementById('hrm');
const TEXT = GROUP.getElementById('widget-text');

let HRM;
let BODY;

if (BodyPresenceSensor) {
  BODY = new BodyPresenceSensor();
}

let lastState = 'enable';
function updateHRMState() {
  if (!HRM) {
    return;
  }

  const isBodyPresent = BODY ? BODY.present : true;
  const isDisplayOn = display.on && !display.aodActive;

  if (isBodyPresent && isDisplayOn) {
    HRM.start();
    if (lastState !== 'enable') {
      GROUP.animate('enable');
      lastState = 'enable';
    }
  } else {
    HRM.stop();
    if (lastState !== 'disable') {
      GROUP.animate('disable');
      lastState = 'disable';
    }
  }
}

export function initHRM() {
  if (!HeartRateSensor || !me.permissions.granted('access_heart_rate')) {
    return;
  }

  HRM = new HeartRateSensor();

  HRM.addEventListener('reading', () => {
    TEXT.text = HRM.heartRate;
  });

  if (BODY) {
    BODY.addEventListener('reading', updateHRMState);
    BODY.start();
  }
  display.addEventListener('change', updateHRMState);

  updateHRMState();
}
