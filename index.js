const config = require('./config/dotenv.config');
const connectDB = require('./config/db.config');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: config.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// Routes import
const authRouter = require('./routes/auth.routes');
const platformRouter = require('./routes/platform.routes');
const submissionRouter = require('./routes/submission.routes');
const revisionRouter = require('./routes/revision.routes');

// Routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/platform", platformRouter);
app.use("/api/v1/submissions", submissionRouter);
app.use("/api/v1/revision", revisionRouter);

// Global Error Handler
const { errorHandler } = require('./middlewares/error.middleware');
app.use(errorHandler);

const PORT = config.PORT;

const { startRevisionScheduler } = require('./jobs/revision.job');

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${PORT}`);
        
        // Start the cron jobs
        startRevisionScheduler();
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});
