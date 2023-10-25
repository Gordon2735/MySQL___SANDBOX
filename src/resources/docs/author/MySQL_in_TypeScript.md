```ts
import * as mysql from 'mysql';

const connection = mysql.createConnection({
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

```ts
import * as mysql from 'mysql2';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mydb'
});

connection.connect((err) => {
	if (err) {
		console.log(err);
		return;
	}

	// Create a table
	connection.query(
		'CREATE TABLE users (id INT AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255))',
		(err, result) => {
			if (err) {
				console.log(err);
				return;
			}

			console.log('Table created!');
		}
	);
});
```

```ts
import * as mysql from 'mysql';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mydb'
});

connection.connect((err) => {
	if (err) {
		console.log(err);
		return;
	}

	// Create the table
	const sql = `
    CREATE TABLE mytable (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      age INT NOT NULL
    );
  `;

	connection.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			return;
		}

		console.log('Table created successfully');
	});
});
```
