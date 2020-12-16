import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";
import { device } from "peer";
import { localStorage } from 'local-storage';

import { onReceive } from './transport';
import asap from "fitbit-asap/companion"


asap.onmessage = message => {
    if (message) {
        console.log('Companion receive message:'+message)
        onReceive(message);
    }
}