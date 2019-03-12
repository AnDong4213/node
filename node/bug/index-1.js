let http = require('http');
let querystring = require('querystring');

/* let server = http.createServer((req, res) => {
	console.log('method: ', req.method);
	let url = req.url;
	console.log('url: ', url);
	req.query = querystring.parse(url.split('?')[1]);
	console.log(req.query)
	// res.end(req.query)
	res.end(
		JSON.stringify(req.query)
	)
}); */

/* let server = http.createServer((req, res) => {
	if (req.method === 'POST') {
		console.log('Header: ', req.headers['content-type']);
		let postData = '';
		req.on('data', chunk => {
			postData  += chunk.toString()
		})
		req.on('end', chunk => {
			console.log('postData: ', postData);
			res.end('Hello, world')
		})
	}
}) */
// res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})

const server = http.createServer((req, res) => {
	let method = req.method;
	let url = req.url;
	let path = url.split('?')[0];
	let query = querystring.parse(url.split('?')[1]);

	res.setHeader('Content-Type', 'application/json');
	let resData = {
		method, url, path, query
	}
	if (method === 'GET') {
		res.end(
			JSON.stringify(resData)
		)
	}

	if (method === 'POST') {
		let postData = '';
		req.on('data', chunk => {
			postData  += chunk.toString()
		})
		req.on('end', chunk => {
			resData.postData = postData;
			res.end(JSON.stringify(resData));
			// res.end(resData); // 必须JSON.stringify(resData)  否则会报错...
		})
	}


})

server.listen(8000);
console.log('OK');



