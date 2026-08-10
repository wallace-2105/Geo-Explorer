// Quick debug test - remove after use
import { createApp } from './src/app.js';
import { createServices } from './src/services/container.js';

const app = createApp(createServices());

// List all routes
function printRoutes(stack, prefix = '') {
  for (const layer of stack) {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
      console.log(`${methods} ${prefix}${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle.stack) {
      printRoutes(layer.handle.stack, prefix + (layer.regexp?.source?.includes('/api') ? '/api' : ''));
    }
  }
}

try {
  printRoutes(app._router.stack);
} catch(e) {
  console.log('Router info:', e.message);
  console.log('App keys:', Object.keys(app));
}

// Simple test
const http = await import('http');
const server = http.createServer(app);
server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  console.log('Test server on port', port);
  
  const req = http.request({ host: '127.0.0.1', port, path: '/api/trails', method: 'GET' }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Response:', data.slice(0, 200));
      server.close();
    });
  });
  req.end();
});
