window.global = window;
window.Buffer = [];

let process;
if (typeof window === "undefined") {
  process = require("process");
} else {
  process = {};
}

window.process = process;
