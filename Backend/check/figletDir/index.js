const figlet = require("figlet");

// console.log(figlet.apple.apple());


figlet("Amar Prakash!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// module.exports = () => {
//   console.log("hello World!");
// }

