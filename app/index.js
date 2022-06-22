import clock from "clock";
import { display } from "display";
import * as document from "document";

import {hourTo12hWord, minuteToFormalWords} from './words';
import {initHRM} from './hrm';

const HOURS = document.getElementById("hours");
const MINUTES_1 = document.getElementById("minutes1");
const MINUTES_2 = document.getElementById("minutes2");

// signal that we support AOD mode
display.aodAllowed = true

// Update the clock every minute
clock.granularity = "minutes";
clock.addEventListener('tick', (evt) => {
  const today = evt.date;
  const hours = today.getHours();
  const minutes = today.getMinutes();
  
  HOURS.text = hourTo12hWord(hours);
  
  const [minutesLine1, minutesLine2] = minuteToFormalWords(minutes);
  MINUTES_1.text = minutesLine1;
  MINUTES_2.text = minutesLine2;
});

initHRM();
