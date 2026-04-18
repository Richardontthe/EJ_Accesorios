//Uso de JQuery para animaciones varias 

$(document).ready(function () {

    $(".inner-faq").hide();

    // click para que se muestre el contenido de cada bloque de la historia
    $(".FAQ-Banner").click(function () {

        $(this)
            .next(".inner-faq")
            .slideToggle(500);

    });


    $(".autor-info-card").hover(

        function () {
            $(this).stop().animate({
                marginLeft: "50px"
            }, 200);
        },
        function () {
            $(this).stop().animate({
                marginLeft: "0px"
            }, 200);


        }
    );






});