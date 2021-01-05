import { Accelerometer } from "accelerometer";
import {send} from "./transport";


// sensor settings
const samplerate = 10; // low for testing
const batch = 50; // low for testing
const settings = { frequency: samplerate, batch: batch };

// initialize sensors
let acc = new Accelerometer(settings);

acc.addEventListener("reading", () => {
    // initialize sending objects
    let data = {};
    data['datatype']="raw_sensor";
    data['key']="acc";
    data['timestamp'] = new Date().getTime();
    data["value_x"] = acc.readings.x
    data["value_y"] = acc.readings.y
    data["value_z"] = acc.readings.z
    data['timestamps'] = acc.readings.timestamp
    send(data)
    // for (let index = 0; index < acc.readings.timestamp.length; index++) {
    //    console.log(
    //         `Accelerometer Reading: \
    //   timestamp=${acc.readings.timestamp[index]}, \
    //   [${acc.readings.x[index]}, \
    //   ${acc.readings.y[index]}, \
    //   ${acc.readings.z[index]}]`
    //     );

    // data['timestamp'] = acc.readings.timestamp[index];
    // data["value_x"] = acc.readings.x[index];
    // data["value_y"] = acc.readings.y[index];
    // data["value_z"] = acc.readings.z[index];
    // console.log('Device is sending:'+JSON.stringify(data));
    //
    // };


})
acc.start()