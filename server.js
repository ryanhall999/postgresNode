const db = require("./db");

db.sync().then(async () => {
	console.log("synced");
	await db.createAuthors("ryan", "hall");
	let authors = await db.readAuthors();
	console.log(authors);
	await db.createAuthors("bob", "dog");
	authors = await db.readAuthors();
	console.log(authors);
	await db.deleteAuthor(authors[0].id);
	authors = await db.readAuthors();
	console.log(authors);
	let newAuth = { first_name: "rob", last_name: "hall", id: authors[0].id };
	await db.updateAuthor(newAuth);
	authors = await db.readAuthors();
	console.log(authors);
	await db.createArticle(
		authors[0].id,
		"words",
		"words words words words words words words words"
	);
	await db.createArticle(
		authors[0].id,
		"words",
		"words words words words words words words words"
	);
	let articles = await db.readArticles();
	console.log(articles);
	let newArt = {
		title: "newwords",
		body: "newwords newwords newwords newwords newwords",
		id: articles[0].id
	};
	await db.updateArticle(newArt);
	articles = await db.readArticles();
	console.log(articles);
	await db.deleteArticle(articles[0].id);
	articles = await db.readArticles();
	console.log(authors, articles);
});
