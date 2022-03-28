import helmet from "helmet";
import path from "path";
const { verify } = require("jsonwebtoken"); // use this to decode the token. We only use verify which is why I deconstructed it

export const configuredHelmet = () =>
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				objectSrc: ["'none'"],
				scriptSrc: ["'self'", "unpkg.com", "polyfill.io"],
				styleSrc: ["'self'", "https: 'unsafe-inline'"],
				upgradeInsecureRequests: [],
			},
		},
	});

export const httpsOnly = () => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = () => (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	console.error(err);
	res.sendStatus(500);
};

export const pushStateRouting = (apiRoot, staticDir) => (req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};

// middleware function that authenticates users based on the req.headers
export const authentication = (userType) => (req, res, next) => {
	// message templates to make life a tad easier
	const successMessage = { success: true, message: `Welcome ${userType}.` };
	const failureMessage = {
		success: false,
		message: "Trainee's aren't authorized to view this page.",
	};

	const bearerToken = req.headers.authentication;

	if (!bearerToken) {
		return res.status(400).json({ ...failureMessage, message: "No token" });
	}

	const token = bearerToken.split("Bearer ")[1]; // only getting the token string from the header

	// verify the token
	const isVolunteer = verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			if (!err) {
				return decoded.is_volunteer;
			}
			return "Token is not valid";
		}
	);

	if (typeof isVolunteer !== "boolean") {
		// this means that the users token has timed out. Meaning we have to regenerate it
		return res
			.status(401)
			.json({ ...failureMessage, message: "Your token is not valid!" });
	}

	// checking each type of user then doing some logic based of that
	switch (userType) {
		case "volunteer":
			// if the page is a volunteer page
			if (isVolunteer) {
				// the person who requested is a volunteer
				res.status(201).json(successMessage);
			} else {
				// the person who requested is a volunteer
				res.status(401).json(failureMessage);
			}
			break;
		case "trainee":
			// if the page is a trainee page
			if (isVolunteer) {
				// the person is a volunteer
				res.status(201).json({
					...successMessage,
					message: "Welcome volunteer to a trainee page!",
				});
			} else {
				// the person is a trainee
				res.status(201).json(successMessage);
			}
			break;
		default:
			// users type doesn't match anything
			res.status(401).json(failureMessage);
			break;
	}
	next();
};
