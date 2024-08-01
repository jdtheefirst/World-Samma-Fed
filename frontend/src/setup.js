window.global = window;
<<<<<<< HEAD

window.Buffer = [];

import * as process from "process";
=======
window.Buffer = [];

let process;
if (typeof window === "undefined") {
  process = require("process");
} else {
  process = {};
}
>>>>>>> master

window.process = process;
