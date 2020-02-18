const db = require("./db");

db.sync().then(async () => {
	console.log("synced");
	console.log(await db.readArticles());
	console.log(await db.readAuthors());
});
