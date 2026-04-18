
$(document).ready(function () {



    // Lista de artistas populares 
    const ARTISTS = [
         "coldplay", "adele", "eminem", "taylor+swift", "the+beatles",
        "daft+punk", "queen", "michael+jackson", "beyonce", "ed+sheeran",
        "bad+bunny", "shakira", "radiohead", "arctic+monkeys", "kanye+west",
        "billie+eilish", "the+weeknd", "drake", "rihanna", "linkin+park",

         "ariana+grande", "dua+lipa", "harry+styles", "post+malone",
        "bruno+mars", "lady+gaga", "miley+cyrus", "sza", "olivia+rodrigo",
        "sabrina+carpenter", "chappell+roan", "charlie+puth",
        "sam+smith", "lana+del+rey", "selena+gomez",

         "travis+scott", "kendrick+lamar", "j+cole", "21+savage",
        "juice+wrld", "xxxtentacion", "lil+baby", "future",
        "nicki+minaj", "cardi+b", "tyler+the+creator",

         "frank+ocean", "usher", "the+dream", "h.e.r",
        "daniel+caesar", "giveon", "benson+boone",

         "david+guetta", "calvin+harris", "martin+garrix",
        "marshmello", "alan+walker", "avicii", "tiesto",

         "imagine+dragons", "red+hot+chili+peppers", "foo+fighters",
        "nirvana", "green+day", "the+killers", "muse",
        "twenty+one+pilots", "fall+out+boy", "panic+at+the+disco",
        "system+of+a+down", "metallica",

         "peso+pluma", "feid", "karol+g", "j+balvin", "ozuna",
        "anuel+aa", "maluma", "nicky+jam", "daddy+yankee",
        "rauw+alejandro", "jhay+cortez", "myke+towers",
        "farruko", "sech", "noriel", "lunay",

         "christian+nodal", "natanael+cano", "xavi",
        "grupo+frontera", "eslabon+armado", "los+plebes+del+rancho",

         "rosalia", "carlos+vives", "enrique+iglesias",
        "marc+anthony", "juan+luis+guerra", "camilo",
        "sebastian+yatra", "manuel+turizo", "reik", "ha+ash",

         "bts", "blackpink", "stray+kids",
    ];

    const API_KEY = "123"; // esta gratis papa
    const BASE_URL = `https://www.theaudiodb.com/api/v1/json/${API_KEY}`;

    async function getRandomSong() {
        // Elige un artista  
        const artist = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];

        // Trae los top 10 tracks del artista
        const response = await fetch(`${BASE_URL}/track-top10.php?s=${artist}`);
        const data = await response.json();

        if (!data.track || data.track.length === 0) {
            throw new Error("No se encontraron canciones");
        }

        // elige solo una del top 10
        const track = data.track[Math.floor(Math.random() * data.track.length)];

        return {
            cancion: track.strTrack,
            artista: track.strArtist,
            album: track.strAlbum,
            genero: track.strGenre

        };
    }


    document.getElementById("btnCancion").addEventListener("click", async () => {
        try {
            const song = await getRandomSong();

            let canciones = document.getElementById("musicBox");

            canciones.innerHTML = `
                    <p><strong class="Ej-accent1">🎵 Canción:</strong> ${song.cancion}</p>
                    <p><strong class="Ej-accent">🎤 Artista:</strong> ${song.artista}</p>
                    <p><strong class="Ej-accent1">💿 Álbum:</strong> ${song.album}</p>
                    <p><strong class="Ej-accent">🎸 Género:</strong> ${song.genero ?? "N/A"}</p>

        `;
        } catch (error) {
            console.error("Error:", error);
        }
    });

});