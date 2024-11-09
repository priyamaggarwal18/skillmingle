import app from "./app.js";
import env from "./src/db/ValidateEnv.js";
import connectDB from "./src/db/config.js";

const PORT = env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
});