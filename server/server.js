import app from "./app.js";
import env from "./src/config/ValidateEnv.js";
import connectDB from './src/config/db.js';

const PORT = env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
    process.exit(1);
});