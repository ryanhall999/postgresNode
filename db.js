const { Client } = require("pg");
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
};

sync();
