const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve images with proper headers
app.use('/assets/images', express.static(path.join(__dirname, 'assets/images'), {
    setHeaders: (res, filePath) => {
        // Set cache headers for images
        if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') ||
            filePath.endsWith('.png') || filePath.endsWith('.webp')) {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
        }
    }
}));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 for missing images gracefully
app.use('/assets/images', (req, res) => {
    res.status(404).json({error: 'Image not found'});
});

// Start the server
app.listen(PORT, () => {
    console.log(`🎒 Bag Collection website running at http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${__dirname}`);
    console.log(`🖼️  Images served from: ${path.join(__dirname, 'assets/images')}`);
    console.log('\n📋 Setup checklist:');
    console.log('   ✓ Create assets/images/bags/ folder');
    console.log('   ✓ Add biggie-bag.jpg, ocean-bag.jpg, reverse-bag.jpg');
    console.log('   ✓ Add assets/images/hero/hero-background.jpg');
    console.log('   ✓ Add assets/images/icons/logo.png');
});

module.exports = app;