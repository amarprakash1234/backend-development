const express = require("express");
const ExpressError = require("./ExpressError");
const app = express();
const func = require("./test/check.js");

console.log("HEllo Backend!!");
console.log(func.sum(3, 5));