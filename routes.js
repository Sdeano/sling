/**
 * Created by I323504 on 11/03/2016.
 */
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html")
    });

    app.get('/samplehelp.html', function (req, res) {
        res.sendFile(__dirname + "/samplehelp.html")
    });

    app.get('/css/main.css', function (req, res) {
        res.sendFile(__dirname + "/css/main.css")
    });

    app.get('/videos/xray-stable-ids.mp4', function (req, res) {
        res.sendFile(__dirname + "/videos/xray-stable-ids.mp4")
    });

    app.get('/images/Neptune.jpg', function (req, res) {
        res.sendFile(__dirname + "/images/Neptune.jpg")
    });

    app.get('/images/SAP-logo2.png', function (req, res) {
        res.sendFile(__dirname + "/images/SAP-logo2.png")
    });
    app.get('/js/jquery.min.js', function (req, res) {
        res.sendFile(__dirname + "/js/jquery.min.js")
    });


    app.get('/fonts/glyphicons-halflings-regular.ttf', function (req, res) {
        res.sendFile(__dirname + "/fonts/glyphicons-halflings-regular.ttf")
    });
}

