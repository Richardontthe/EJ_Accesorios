
$(document).ready(function () {



    // Lista de artistas populares para rotar aleatoriamente
    const ARTISTS = [
        "coldplay", "adele", "eminem", "taylor+swift", "the+beatles",
        "daft+punk", "queen", "michael+jackson", "beyonce", "ed+sheeran",
        "bad+bunny", "shakira", "radiohead", "arctic+monkeys", "kanye+west",
        "billie+eilish", "the+weeknd", "drake", "rihanna", "linkin+park"
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