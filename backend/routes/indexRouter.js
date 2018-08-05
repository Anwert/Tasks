const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

if (!isDevelopment) {

  fs.readFile(path.join(__dirname, '../../rev-manifest.json'), (err, data) => {

    if (err) console.log(err);

    const manifest = JSON.parse(data);

    const cssManifest = manifest["index.css"].toString();
    router.get(`/styles/${cssManifest}`, (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', 'styles', cssManifest));
    });

    const webpackManifest = manifest["index.js"].toString();
    router.get(`/src/${webpackManifest}`, (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', 'src', webpackManifest));
    });

    const assetsManifestMounts = manifest["Mounts.jpg"].toString();
    router.get(`/assets/${assetsManifestMounts}`, (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', 'assets', assetsManifestMounts));
    });

    const assetsManifestSearch = manifest["search.png"].toString();
    router.get(`/assets/${assetsManifestSearch}`, (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', 'assets', assetsManifestSearch));
    });

    router.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', manifest["index.html"].toString()));
    });

  })

} else {

  router.get('/styles/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'styles', 'index.css'));
  });

  router.get('/src/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'src', 'index.js'));
  });

  router.get('/assets/Mounts.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'assets', 'Mounts.jpg'));
  });

  router.get('/assets/search.png', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'assets', 'search.png'));
  });

  router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  });

}

module.exports = router;
