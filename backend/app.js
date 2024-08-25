require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes');
const { v4: generateId } = require('uuid');
const { mergeCarts } = require('./controllers/cart');
const chalk = require('chalk');

const app = express();

const corsConfig = {
	origin: 'http://localhost:3000',
	credentials: true,
};

app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

app.all('*', async (req, res, next) => {
	try {
		if (!req.cookies.token && !req.cookies.guestId) {
			const guestId = generateId();
			req.cookies.guestId = guestId;
			res.cookie('guestId', guestId, { maxAge: 1000 * 60 * 60 * 24 * 7 });
		}

		if (req.cookies.token && req.cookies.guestId) {
			await mergeCarts(req.cookies.token, req.cookies.guestId);
			res.cookie('guestId', '');
		}

		next();
	} catch (error) {
		console.warn('Suspicious visitor');
		console.warn(error);
	}
});

app.use('/', router);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(process.env.PORT, () => {
		console.log(chalk.cyan.bold('Server has started on port %s...'), process.env.PORT);
	});
});
