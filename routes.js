/**
 * Created by I323504 on 11/03/2016.
 */
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html")
    });

    app.get('/css/main.css', function (req, res) {
        res.sendFile(__dirname + "/css/main.css")
    });

    app.get('/images/Neptune.jpg', function (req, res) {
        res.sendFile(__dirname + "/images/Neptune.jpg")
    });
}