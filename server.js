const db = require("./db");

db.sync().then(async () => {
	console.log("synced");
	// console.log(await db.readArticles());
	await db.createAuthors("ryan", "hall");
	let authors = await db.readAuthors();
	console.log(authors);
	// await db.createAuthors("bob", "dog");
	// authors = await db.readAuthors();
	// console.log(authors);
	// await db.deleteAuthor(authors[0].id);
	// authors = await db.readAuthors();
	// console.log(authors);
	// let newAuth = { first_name: "rob", last_name: "hall", id: authors[0].id };
	// await db.updateAuthor(newAuth);
	// authors = await db.readAuthors();
	// console.log(authors);
});
