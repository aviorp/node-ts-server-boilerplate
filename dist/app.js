"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const db_1 = require("./db");
const morgan = require('morgan');
const app = express_1.default();
const port = process.env.port || 3000;
app.use(express_1.default.json());
app.use(morgan());
db_1.connectToMongo();
app.use(routes_1.default);
app.use('/auth', authRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.messages
    });
});
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=app.js.map