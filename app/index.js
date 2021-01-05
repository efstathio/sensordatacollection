import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { me } from "appbit";
import {send} from "./transport";
import { BodyPresenceSensor } from "body-presence";
import { HeartRateSensor } from "heart-rate";
import { geolocation } from "geolocation";

me.appTimeoutEnabled = false;

// sensor settings
const samplerate = 1; // low for testing
const batch = 5; // low for testing
const settings = { frequency: samplerate, batch: batch };

// initialize sensors
let acc = new Accelerometer(settings);
let gyro = new Gyroscope(settings);
let bps = new BodyPresenceSensor();
let hrm = new HeartRateSensor({frequency:1});

hrm.addEventListener("reading", () => {
    // initialize sending objects
    let data_hrm = {};
    data_hrm['datatype']="raw_sensor";
    data_hrm['key']="hrm";
    data_hrm['timestamp'] = new Date().getTime();
    data_hrm["heart_rate"] = hrm.heartRate
    data_hrm['timestamps'] = hrm.heartRate.timestamp
    send(data_hrm)
})
hrm.start()

acc.addEventListener("reading", () => {
    // initialize sending objects
    let data_acc = {};
    data_acc['datatype']="raw_sensor";
    data_acc['key']="acc";
    data_acc['timestamp'] = new Date().getTime();
    data_acc["acc_x"] = acc.readings.x
    data_acc["acc_y"] = acc.readings.y
    data_acc["acc_z"] = acc.readings.z
    data_acc['timestamps'] = acc.readings.timestamp
    send(data_acc)
})
acc.start()

gyro.addEventListener("reading", () => {
    // initialize sending objects
    let data_gyro = {};
    data_gyro['datatype']="raw_sensor";
    data_gyro['key']="gyro";
    data_gyro['timestamp'] = new Date().getTime();
    data_gyro["gyro_x"] = gyro.readings.x
    data_gyro["gyro_y"] = gyro.readings.y
    data_gyro["gyro_z"] = gyro.readings.z
    data_gyro['timestamps'] = gyro.readings.timestamp
    send(data_gyro)
})
gyro.start()

bps.addEventListener("reading", () => {
    // initialize sending objects
    let data_bps = {};
    data_bps['datatype']="raw_sensor";
    data_bps['key']="bps";
    data_bps['timestamp'] = new Date().getTime();
    data_bps['presence'] = bps.present;
    data_bps['timestamps'] = bps.present.timestamp
    send(data_bps)
})
bps.start()