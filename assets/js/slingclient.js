/**
 * Created by I323504 on 13/05/2016.
 */
var socket = io();



$("#menutoggle").on("click",function()
{
    $(".side-menu ul").slideToggle();
});

$(window).ready(function()
    {
        console.log($(".side-list:first-child"))
    }
)

$(".sling-menu li a").on("click",function() {

    var clickedItem = $(this);
    var position = $(this).parent().position();
    socket.emit("interact",$(clickedItem).attr("alt"),$(".copyable").text());

    socket.emit("interact",$(clickedItem).attr("alt"));
    $(this).animate({backgroundColor:"green",borderRadius:'50%',boxShadow:"0px 0px 0px rgb(0,0,0),inset 0px 0px 0px rgb(0,0,0)",color:"white"});
    $(this).parent().animate({top:"-=60px"});
    $(this).parent().animate({position:"absolute",left:"100%"},function()
    {
        console.log(clickedItem.parent());

        $(clickedItem).parent().removeAttr('style');
        $(clickedItem).removeAttr('style');
        $(clickedItem).hide().fadeIn("slow",function()
        {
            //Animation Complete
        });
        //$(clickedItem).animate({width:"100%",height:"100%"});



    });
    /* $(this).parent().css({
     position:"relative",
     top:position.top,
     bottom:position.bottom,
     right:position.right,
     left:position.left
     })*/









});

$(".slingbutton").on("click",function()
{

    socket.emit("interact","copyable",$(this).siblings(".copyable").text());



});