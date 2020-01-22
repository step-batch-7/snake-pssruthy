const { Server } = require('net');
const { readFileSync , existsSync} = require('fs');

const defaultResponse = [ 'HTTP/1.1 404 Not Found', 'Content-Length: 0', '', '' ].join('\n');

const generateGetResponse = function(resource){
  let [,content_type] = resource.split('.');
  let usrUrl = `.${resource}`;
  if(resource === '/') {
    content_type = 'html';
    usrUrl = './index.html';
  }
  if(existsSync(usrUrl)) {
    const responseFile = readFileSync(`${usrUrl}`,'utf8');
    return response = [ 'HTTP/1.1 200 OK', `Content-type: text/${content_type}; charset=utf-8`, `Content-Length: ${responseFile.length}`, '', responseFile, '', '' ].join('\n');
  }
  return defaultResponse;
}

const generateResponse = function(request){
  const [method, resource, protocol] = request.split(' ');
  if(method == 'GET') {
    return generateGetResponse(resource);   
  }
  return defaultResponse;
}

const handleRequest = (text, socket) => {
  console.warn(text);
  const [request, ...headers] = text.split('\n');
  const response = generateResponse(request);
  socket.write(response);
}

const handleConnection = socket => {
	socket.setEncoding('utf8');
  console.warn('Connected');
  socket.on('data', (text) => handleRequest(text, socket));
  socket.on('error', (err) => console.warn('Error', err))
  socket.on('close', () => console.warn('Connection closed'));
  socket.on('end', () => console.warn('Connection ended'));
  
};

const main = function(port) {
  const server = new Server();
  server.on('connection', handleConnection);
	server.on('error', (error) => console.log('------Sever Error:', error));
  server.listen(port,() => {
		console.warn(`Serving HTTP on 0.0.0.0 port ${port} (http://0.0.0.0:${port}/) ...`);
 })
};

main(8080);