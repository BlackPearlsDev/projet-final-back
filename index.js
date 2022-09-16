import express from 'express';
import {fileURLToPath} from 'url';
import "dotenv/config";
import path from 'path';
import fileUpload from 'express-fileupload';
import {errorHandler} from './error/errorHandler.js';
import router from './router/index.js';
import { PORT } from "./config/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
app.use(express.static(path.join(__dirname + "/public")));
app.use(fileUpload({ createParentPath: true }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
