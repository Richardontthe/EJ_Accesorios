$(document).ready(

    //para que sea mas dinamico 

    $('.about-arrow-circle').hover(

        function () {
            $(this).stop().animate({
                marginTop: "10px"
            }, 200);
        },
        function () {
            $(this).stop().animate({
                marginTop: "0px"
            }, 200);
        }
    )





);



 