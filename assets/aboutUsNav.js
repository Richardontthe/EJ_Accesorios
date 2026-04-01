// Function to initialize 
function initializeSections() {
    const sectionNumber = 6;

    for (let index = 1; index <= sectionNumber; index++) {
        const element = document.getElementById(`sectionAbout_${index}`);
         if (element) {
            element.classList.add("d-none");
        }
    }
}

 function revealSection(sectionName) {
    let section = document.getElementById(sectionName);
    if (section) {
        section.classList.remove("d-none");
    }
}

 
$(document).ready(function() {
    
    // para dinamizarlo un poco
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
    $('.glow-box').hover(
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

});