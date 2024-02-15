"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatesOfCountry = void 0;
var states_json_1 = __importDefault(require("./states.json"));
var interface_1 = require("./interface");
function getStatesOfCountry(countryCode) {
    if (countryCode === void 0) { countryCode = ''; }
    if (!countryCode)
        return [];
    var states = states_json_1.default.filter(function (value) {
        return value.countryCode === countryCode;
    });
    return states.sort(interface_1.compare);
}
exports.getStatesOfCountry = getStatesOfCountry;
