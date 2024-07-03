import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

// Questions array for inquirer
const questions = [
  {
    type: "input",
    name: "url",
    message: "Enter the URL:",
    validate: function (value) {
      // Simple validation to check if the input is a URL (you can enhance this validation as needed)
      const isValidUrl =
        value.startsWith("http://") || value.startsWith("https://");
      if (isValidUrl) {
        return true;
      } else {
        return "Please enter a valid URL (starting with http:// or https://)";
      }
    },
  },
];

// Prompting the user
inquirer
  .prompt(questions)
  .then((answers) => {
    const { url } = answers;

    // Write URL to url.txt file
    fs.writeFileSync("url.txt", answers.url);

    // Generate QR code image in PNG format
    const sanitizedFileName = sanitizeFileName(url);
    const qr_png = qr.imageSync(url, { type: "png" });
    fs.writeFileSync(`${sanitizedFileName}.png`, qr_png);

    console.log(`QR code generated for ${url}`);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });

// Function to sanitize the URL and generate a valid file name
function sanitizeFileName(url) {
  // Remove protocol and special characters from URL
  const sanitized = url.replace(/^(https?:\/\/)/, "").replace(/[^\w\s\-]/g, "");
  return sanitized;
}
