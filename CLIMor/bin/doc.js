const fs   = require("fs");
const path = require("path");

function createDirectory(directoryPath) {
  const directory = path.normalize(directoryPath);
  return new Promise((resolve, reject) => {
    fs.stat(directory, error => {
      if (error) {
        if (error.code === "ENOENT") {
          fs.mkdir(directory, error => {
            if (error) {
              reject(error);
            } else {
              resolve(directory);
            }
          });
        } else {
          reject(error);
        }
      } else {
        resolve(directory);
      }
    });
  });
}

const directoryPath = `${__dirname}/mor`;

createDirectory(directoryPath)
  .then(path => {
    console.log(`Successfully created directory: "${path}"`);
  })
  .catch(error => {
    console.log(`Problem creating directory: ${error.message}`);
  });
