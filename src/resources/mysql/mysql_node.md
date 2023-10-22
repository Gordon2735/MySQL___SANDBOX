<!-- Using Node.js & MySQL without Frameworks: NOTES -->

# Using Node.js & MySQL without Frameworks: NOTES...

-   Use mysql2 package instead of mysql package
-   Use promises instead of callbacks
-   Use async/await instead of promises
-   Using Typescript instead of Javascript
-   Use ESM instead of CommonJS // Modules instead of require

## To Connect to MySQL

-   To connect to MySQL in Node.js using TypeScript and ESM modules, you can use the following code:

```ts
import { createConnection } from 'mysql2/esm';

const connection = createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mydb'
});

connection.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to MySQL!');
	}
});
```

## Connect to a MySQL database named mydb on the local host

-   This code will connect to a MySQL database named mydb on the local host. You can then use the connection object to execute SQL queries. For example, the following code will insert a row into the users table:

```ts
const query = `INSERT INTO users (name, email) VALUES ('John Doe', 'johndoe@example.com');`;

connection.query(query, (err, result) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Row inserted!');
	}
});
```
