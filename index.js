/**
 * Created by I323504 on 11/03/2016.
 */
/**
 * Created by I323504 on 20/01/2016.
 */

/*
 This app is designed to streamline the process of delivering synchronous mobile
 help content. Adding this to your project will allow you to display help content on your users mobile device
 that corresponds with what they are currently doing on their main screen.
 */
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var routes =require('./routes')(app);


app.use(express.static('/',routes));
app.use(express.static(__dirname + '/public'));
var socketID;
var users;
var activeUsers = [];
var verficationKey;
var user = {};


//Accepting and handling incoming connection
io.on("connection",function(client)
{
    //Initial connection from client main device
    client.on("client connect",function(credentials)
    {
        credentials.socketID = client.id;
        var repeat = false;

        //Checking if this user is already connected
        for(var key in activeUsers)
        {
            credentials.verificationKey == activeUsers[key].verificationKey ?
                (io.to(client.id).emit("connection denied", "That user is already connected"),repeat = true):console.log("still checking")
        }

        repeat ? console.log("no new user was added"):activeUsers.push(credentials);

    });
    /*
     Connecting a mobile to the main client. Ideally done by way of a key
     generated via qrcode. If the verificationKey supplied by the mobile device is correct, the
     socketID of the mobile device is sent to the corresponding client.
     */
    client.on("mobile connect",function(verification)
    {
        console.log("mobile connected");
        for(var key in activeUsers)
        {
            if(verification == activeUsers[key].verificationKey)
            {
                activeUsers[key].mobileSocket=client.id;
                io.to(activeUsers[key].mobileSocket).emit("connection response");
                io.to(activeUsers[key].socketID).emit("connection confirmed");
                console.log(activeUsers[key].mobileSocket + " here");
            }
        }
    });

    client.on("client reconnect",function(vkey)
    {
        findByKey(vkey).socketID = client.id;
    });

    client.on("disconnect",function()
    {
        console.log(client.id + " has disconnected");
        //activeUsers.splice(findBySocketID(client.id));
    });

    client.on("reconnector",function(verificationKey)
    {
        console.log("aahhhh");
        for(var key in activeUsers)
        {
            if(activeUsers[key].verificationKey==verificationKey)
            {
                console.log("reconnect");
                activeUsers[key].mobileSocket=client.id;
            }
        }
    });
    client.on("confirm connect",function(msg)
    {
        for(var key in activeUsers)
        {
            if(activeUsers[key].socketID==client.id)
            {
                console.log("here");
                io.to(activeUsers[key].mobileSocket).emit("confirmed",msg);
            }
        }

    });

    client.on("send help",function(alt, altsrc, altaud,altinfo,vkey)
    {

        if(findByKey(vkey).mobileSocket!=undefined) {
            console.log("help was sent");
            io.to(findByKey(vkey).mobileSocket).emit("display help", alt, altsrc, altaud, altinfo);
        }
    });

    client.on("sendevent",function(any)
    {
        io.emit("confirmedevent","happy");
    });

    client.on("desktop help request",function(altinfo,vkey)
    {
        io.to(findByKey(vkey).socketID).emit("display desktop help",altinfo);
    });
    client.on("new message",function(msg)
    {
        io.emit("confirming message","this confirms it");
    });

    client.on("interact",function(alt,copy)
    {
        console.log(copy);
        io.emit("interactclient",alt,copy);
    });

});



http.listen(3003,function()
{
    console.log("listening on 3002");
});

function findByKey(vkey) {
    for (var key in activeUsers) {
        console.log(vkey + " " + activeUsers[key].verificationKey);
        if (activeUsers[key].verificationKey == vkey) {
            return activeUsers[key];
        }
    }
    return "55";
}


function findBySocketID(SocketID)
{
    for(var ID in activeUsers)
    {
        console.log(SocketID + " " + activeUsers[ID].socketID);
        if(activeUsers[ID].socketID==socketID)
        {
            return ID;
        }
    }
    return "55";
}


