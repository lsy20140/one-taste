import mysql, {ConnectionOptions} from 'mysql2'

const access : ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME
}

const conn = mysql.createConnection(access)

const executeQuery = (query: string) => {  
	return new Promise((resolve, reject) => {  
		conn.query(query, (error, results) => {  
			if (error) {  
				return reject(error);  
			}  
			resolve(results);  
		});  
	});  
}  

export default executeQuery