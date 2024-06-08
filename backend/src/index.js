var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = 5001;
app.use(bodyParser.json());
app.use(cors());
var users = [
    { email: 'jim@gmail.com', number: '221122' },
    { email: 'jam@gmail.com', number: '830347' },
    { email: 'john@gmail.com', number: '221122' },
    { email: 'jams@gmail.com', number: '349425' },
    { email: 'jams@gmail.com', number: '141424' },
    { email: 'jill@gmail.com', number: '822287' },
    { email: 'jill@gmail.com', number: '822286' }
];
var currentTimeout = null;
app.post('/search', function (req, res) {
    var _a = req.body, email = _a.email, number = _a.number;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format. Please provide a valid email address.' });
    }
    if (number && !/^\d{6}$/.test(number)) {
        return res.status(400).json({ error: 'Invalid number format. Number should be a 6-digit string.' });
    }
    if (currentTimeout) {
        clearTimeout(currentTimeout);
    }
    currentTimeout = setTimeout(function () {
        try {
            var results = users.filter(function (user) {
                return user.email === email && (!number || user.number === number);
            });
            res.json(results);
        }
        catch (error) {
            console.error('Error searching users:', error);
            res.status(500).json({ error: 'An error occurred while searching for users.' });
        }
    }, 5000);
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
