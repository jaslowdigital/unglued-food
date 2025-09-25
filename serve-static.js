// Simple static file server for the converted site
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  extensions: ['html'] // Allow accessing /about as /about.html
}));

// Handle client-side routing fallback for clean URLs
app.get('*', (req, res) => {
  // Try to serve the file with .html extension first
  const requestedPath = req.path.endsWith('/') ? req.path + 'index.html' : req.path + '/index.html';
  const filePath = path.join(__dirname, 'dist', requestedPath);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file doesn't exist, send 404 page or fallback
      res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Page Not Found - Unglued Food</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #f59e0b; }
            a { color: #f59e0b; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/">Go back to home</a>
        </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Static site server running at http://localhost:${PORT}`);
  console.log(`📖 Browse all ${48} recipes at http://localhost:${PORT}/recipes/`);
  console.log(`🎃 ${14} Halloween recipes are featured on the home page!`);
  console.log(`📚 Educational content available at http://localhost:${PORT}/education/gluten-free-basics/`);
});