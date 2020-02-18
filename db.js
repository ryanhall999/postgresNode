const { Client } = require("pg");
const uuid = require("uuid");
const client = new Client("postgres://localhost/nodepg");

client.connect();

const sync = async () => {
	const SQL = `DROP TABLE IF EXISTS authors;
    DROP TABLE IF EXISTS articles;
    CREATE TABLE authors(
      id UUID PRIMARY KEY,
      first_name VARCHAR,
      last_name VARCHAR, 
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE articles(
      id UUID PRIMARY KEY,
      author_id UUID,
      title VARCHAR,
      body VARCHAR,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
	await client.query(SQL);
	// await deleteAuthor(authors[0].id);
	// const articles = await createArticle("words", "words words words words");
};

const readAuthors = async () => {
	const SQL = `SELECT * FROM authors`;
	const response = await client.query(SQL);
	return response.rows;
};

const readAuthor = async id => {
	const SQL = `SELECT * FROM authors WHERE id=$1`;
	const response = await client.query(SQL, [id]);
	return response.rows;
};

const deleteAuthor = async id => {
	const SQL = `DELETE FROM authors WHERE id=$1`;
	await client.query(SQL, [id]);
};

const createAuthors = async (firstName, lastName) => {
	const SQL = `INSERT INTO authors(id, first_name, last_name) values( $1, $2, $3)`;
	await client.query(SQL, [uuid(), firstName, lastName]);
};

const updateAuthor = async author => {
	const SQL = `UPDATE authors set first_name = $1, last_name = $2 WHERE id=$3`;
	const response = client.query(SQL, [
		author.first_name,
		author.last_name,
		author.id
	]);
};

// const readArticles = async () => {
// 	const SQL = `SELECT * FROM articles`;
// 	const response = await client.query(SQL);
// 	return response.rows;
// };
// const createArticle = async (title, body) => {
// 	const SQL = `INSERT INTO articles(id, title, body) values( $1, $2, $3)`;
// 	await client.query(SQL, [uuid(), title, body]);
// };

sync();

module.exports = {
	sync,
	readAuthors,
	readAuthor,
	deleteAuthor,
	createAuthors,
	updateAuthor
};
