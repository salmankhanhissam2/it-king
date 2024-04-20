const app = require("./app");
const db  = require("./db/db");
const port = 3000;

try {
    db()
    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    })
} catch (error) {
    console.log(error)
}
