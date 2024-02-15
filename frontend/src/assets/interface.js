"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = void 0;
var compare = function (a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
};
exports.compare = compare;
