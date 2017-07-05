const express = require('express');
const Sugar = require('sugar');

const app = express();

app.get("/*", (req, res) => {
    const parameter = decodeURIComponent(req.url.substring(1));

    var date;
    if (!isNaN(parameter)) {
        date = new Date(parseInt(parameter)*1000);
    } else {
        date = Sugar.Date.create(parameter);
    }

    var unixDateString;
    var naturalDateString;

    if(date == "Invalid Date") {
        unixDateString = null;
        naturalDateString = null;
    } else {
        unixDateString = new Sugar.Date(date).format('{X}').raw;
        naturalDateString = new Sugar.Date(date).medium().raw;
    }

    const responseObject = {
        unix: unixDateString,
        natural: naturalDateString
    }

    res.end(JSON.stringify(responseObject, undefined, 2));
});

app.listen(3000);