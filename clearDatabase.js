const fs = require("fs");
let clearedDatabase = {
    "users": {

    }
};

fs.writeFile("database.json", JSON.stringify(clearedDatabase), err => {
    if (err) throw err;
});