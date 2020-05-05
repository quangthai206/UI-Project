const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/customer/message", function (req, res) {
    if (req.body.newLetter === true) {
        var data = {
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.name,
                LNAME: req.body.name
            }
        };
        var jsonData = JSON.stringify(data);

        var options = {
            method: 'POST',
            url: 'https://us20.api.mailchimp.com/3.0/lists/78535ced25/members/',
            body: jsonData,
            headers: {
                'Authorization': 'quangthai206 3a9d127566b207627a44a627df8b3124-us20',
                'Content-Type': 'application/json'
            }

        }

        request(options, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                if (response.statusCode !== 200) {
                    console.log("Code != 200");
                } else {
                    console.log("Code = 200");
                }
            }
        });
    }
    setTimeout(function () {
        res.json({
            "status": "success",
        });
    }, 1000);

});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(PORT, function () {
    console.log("Server started on port 3000");
})