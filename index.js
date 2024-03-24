const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the correct directory
app.use(express.static('public'));

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Handle POST request to save data
app.post('/saveData', (req, res) => {
    // Retrieve data from the request body
    const { name, email,password, child_name, child_interest, parent_age } = req.body;
    
    // Construct the data string to save
    const data = `${name}, ${email}, ${password}, ${child_name}, ${parent_age}, ${child_interest}  `;
    
    // Define the filename and file path
    const filename = 'saved_data.txt';
    const filePath = path.join(__dirname, filename);

    // Write data to the file
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data.');
        } else {
            console.log('Data saved successfully.');
            // Redirect to the homepage
            res.redirect('/Homepage.html');
        }
    });
});

app.get('/readData', (req, res) => {
    // Define the filename and file path
    const filename = 'saved_data.txt';
    const filePath = path.join(__dirname, filename);

    // Read data from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data.');
        } else {
            console.log('Data read successfully:', data);
            // Send the retrieved data to the client-side JavaScript
            res.status(200).send(data);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
