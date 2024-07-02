
const fs = require("node:fs");
const content = "Some content!";
try {
  fs.writeFileSync("test.txt", content);
  // file written successfully
} catch (err) {
  console.error(err);
}


fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
