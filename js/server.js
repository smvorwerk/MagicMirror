/* Magic Mirror
 * Server
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
const express = require("express");
const app = require("express")();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const path = require("path");
const ipfilter = require("express-ipfilter").IpFilter;
const fs = require("fs");
const { readdirSync } = require("fs");
const helmet = require("helmet");
var router = express.Router();
const Log = require("logger");
const Utils = require("./utils.js");
var multer = require("multer");
let exec = require("child_process").exec;

/**
 * Server
 *
 * @param {object} config The MM config
 * @param {Function} callback Function called when done.
 * @class
 */
function Server(config, callback) {
	const port = process.env.MM_PORT || config.port;

	let server = null;
	if (config.useHttps) {
		const options = {
			key: fs.readFileSync(config.httpsPrivateKey),
			cert: fs.readFileSync(config.httpsCertificate)
		};
		server = require("https").Server(options, app);
	} else {
		server = require("http").Server(app);
	}
	const io = require("socket.io")(server, {
		cors: {
			origin: /.*$/,
			credentials: true
		},
		allowEIO3: true
	});

	Log.log(`Starting server on port ${port} ... `);

	server.listen(port, config.address || "localhost");

	if (config.ipWhitelist instanceof Array && config.ipWhitelist.length === 0) {
		Log.warn(Utils.colors.warn("You're using a full whitelist configuration to allow for all IPs"));
	}

	app.use(function (req, res, next) {
		ipfilter(config.ipWhitelist, { mode: config.ipWhitelist.length === 0 ? "deny" : "allow", log: false })(req, res, function (err) {
			if (err === undefined) {
				return next();
			}
			Log.log(err.message);
			res.status(403).send("This device is not allowed to access your mirror. <br> Please check your config.js or config.js.sample to change this.");
		});
	});

	app.use(helmet({ contentSecurityPolicy: false }));

	app.use("/js", express.static(__dirname));

	const directories = ["/config", "/css", "/fonts", "/modules", "/vendor", "/translations", "/tests/configs"];
	for (const directory of directories) {
		app.use(directory, express.static(path.resolve(global.root_path + directory)));
	}

	app.get("/version", function (req, res) {
		res.send(global.version);
	});

	app.get("/config", function (req, res) {
		res.send(config);
	});

	app.get("/", function (req, res) {
		let html = fs.readFileSync(path.resolve(`${global.root_path}/index.html`), { encoding: "utf8" });
		html = html.replace("#VERSION#", global.version);

		let configFile = "config/config.js";
		if (typeof global.configuration_file !== "undefined") {
			configFile = global.configuration_file;
		}
		html = html.replace("#CONFIG_FILE#", configFile);

		res.send(html);
	});

	app.get("/profileFolderCreate", function (req, res) {
		console.log("profileFolderCreate GET");
	});

	app.post("/profileFolderCreate", function (req, res) {
		profileImageName = req.body.profileName + ".jpg";
		createPath = "./modules/MMM-Face-Reco-DNN/dataset/" + req.body.profileName;
		fs.mkdir(createPath, function (err) {
			if (err) {
				if (err.code == "EEXIST") throw "Same Folder Exist!";
				createPath = "./modules/MMM-Face-Reco-DNN/dataset/" + req.body.profileName;
			}
			console.log("new profile Folder Create!");
		});
		console.log("FolderName:" + req.body.profileName);
		// console.log("new profile Folder Create!");
	});

	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			var imageStoragePath = createPath;
			cb(null, imageStoragePath);
			console.log("multerPath:" + createPath);
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		},
		fileFilter: function (req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
				return callback(new Error("You must upload Image files"));
			}
			callback(null, true);
		}
	});

	var upload = multer({ storage: storage });

	var storage2 = multer.diskStorage({
		destination: function (req, file, cb) {
			var imageStoragePath2 = "./modules/Face-Reco-Multi-Users/Users_img";
			cb(null, imageStoragePath2);
		},
		filename: function (req, file, cb) {
			cb(null, profileImageName);
		},
		fileFilter: function (req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
				return callback(new Error("You must upload Image files"));
			}
			callback(null, true);
		}
	});

	var upload2 = multer({ storage: storage2 });

	app.get("/imageRepresentUpload", function (req, res) {
		console.log("imageRepresentUpload GET");
	});

	app.post("/imageRepresentUpload", upload2.single("imageRepresentUpload"), function (req, res) {
		console.log("Image Represent Upload Complete!");
		res.send("Image Represent Upload Complete!");
	});

	app.get("/imageUpload", function (req, res) {
		console.log("imageUpload GET");
	});

	app.post("/imageUpload", upload.array("profile", 10), function (req, res) {
		console.log("Image Upload Complete!");
		res.send("Image Upload Complete!");
	});

	app.get("/imageEncode", function (req, res) {
		console.log("imageEncode GET");
	});

	app.post("/imageEncode", function (req, res) {
		var command = "cd modules/MMM-Face-Reco-DNN/tools && python3 encode.py -i ../dataset/ -e encodings.pickle -d hog";
		exec(command, (err, out, stderr) => {
			console.log(out);
			res.send("Encoding Done! Go back home and reboot Mirror!");
		});
	});

	module.exports = router;

	if (typeof callback === "function") {
		callback(app, io);
	}
}

module.exports = Server;
