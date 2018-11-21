var express = require('express');
var app = express();

function init() {
  console.log('Initialize static server...');
  app.use('/style.css', express.static(`${__dirname}/assets/style.css`));
  app.use('/assets', express.static(`${__dirname}/assets`));
  app.use('/images', express.static(`${__dirname}/assets/images`));
  app.get('/robots.txt', (req, res) => {  res.sendFile(`${__dirname}/assets/robots.txt`); });
  app.get('/humans.txt', (req, res) => {  res.sendFile(`${__dirname}/assets/humans.txt`); });

  // Serve application file depending on environment
  app.get('/app.js', (req, res) => { res.sendFile(`${__dirname}/assets/app.js`); });

  // Serve index page
  app.get('*', (req, res) => { res.sendFile(`${__dirname}/assets/index.html`); });

  const port = process.env.PORT || 8000;
  const server = app.listen(port, () => {
    const host = server.address().address;
    console.log('Essential React listening at http://%s:%s', host, port);
  });
}

module.exports = init;
