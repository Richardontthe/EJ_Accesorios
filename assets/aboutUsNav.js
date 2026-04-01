




//funcion para inicializar las secciones ocultar 

function initializeSections() {
    const sectionNumber = 5

    for (let index = 1; index <= sectionNumber; index++) {
        const element = document.getElementById(`sectionAbout_${index}`);
        element.classList.add("d-none");
    }

}



//funicion para revelar las secciones 

 function revealSection(sectionName){
    let section = document.getElementById(sectionName);
    section.classList.remove("d-none");

}



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
    );

    initializeSections();



);
