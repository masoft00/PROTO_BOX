require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var formidable = require("formidable");
const util = require("util"),
  fss = require("fs-extra"),
  path = require("path");
const NewFile = require("./models/file");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("aytiaaa base de donnée"));

app.post("/upload", function(req, res) {
  if (req.method.toLowerCase() == "post") {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      const fileNew = new NewFile({
        filename: files.file.name,
        fileType: files.file.type,
        size: files.file.size
      });
      try {
        const ffile = fileNew.save();
        res.writeHead(200, { "content-type": "text/plain" });
        res.write("received upload :\n\n");
        res.end(util.inspect({ fields: fields, files: files }));
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

      console.log(fields);
      console.log();
    });

    form.on("fileBegin", function(name, file) {
      file.path = path.join("./temp/") + file.name;
    });

    form.on("progress", function(bytesReceived, bytesExpected) {
      var percent_complete = (bytesReceived / bytesExpected) * 100;
      console.log(percent_complete.toFixed(2));
    });

    form.on("end", function(fields, files) {
      /* Temporary location of our uploaded file */
      var temp_path = this.openedFiles[0].path;
      /* The file name of the uploaded file */
      var file_name = this.openedFiles[0].name;
      /* Location where we want to copy the uploaded file */
      var new_location = path.join(__dirname, "/upload/");

      fss.copy(temp_path, new_location + file_name, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("success !");

          // Delete the "temp" file
          fss.unlink(temp_path, function(err) {
            if (err) {
              console.error(err);
              console.log("Il ya eu des problèmes lors de la suppression !");
            } else {
              console.log("temp supprimé avec succes !");
            }
          });
        }
      });
    });
  }

  return;
});

app.get("/upload", async (req, res) => {
  try {
    const files = await NewFile.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log("serveur waaaye"));
