import asap from "fitbit-asap/app";

export function send(event) {
    asap.send(JSON.stringify(event), {'timeout': 604800000});
}