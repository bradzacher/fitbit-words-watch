import { me } from 'appbit';
import { display } from 'display';

import { initClock } from './clock';
import { initHRM } from './hrm';

// signal that we support AOD mode
if (display.aodAvailable && me.permissions.granted('access_aod')) {
  display.aodAllowed = true;
}

initHRM();
initClock();
