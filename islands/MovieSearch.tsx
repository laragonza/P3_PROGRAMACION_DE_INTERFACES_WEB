import { useSignal } from "@preact/signals";
import MovieCard from "../components/MovieCard.tsx";

/*
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmZmYTcxYmU1ZGFhMDBlMTJjMWJjMTMxMjBlM2Q3NSIsIm5iZiI6MTY4NTM4MTkzNS4wMTYsInN1YiI6IjY0NzRlMzJmY2MyNzdjMDBhNzQ2MTYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.raEEljpmsGfGMENtPmE-LFWcBEiDUcFKG5B-8_WQABQ";
const API_URL = "https://api.themoviedb.org/3/search/movie";
*/

export default function MovieSearch() {
    const query = useSignal("");
    const columns = useSignal(2);
    const movies = useSignal([]);

    async function fetchMovies() {
        if (!query.value) return;
        const response = await fetch(`/api/search?query=${encodeURIComponent(query.value)}`);
        const data = await response.json();
        movies.value = data || [];
      }
      

    return (
        <div class="p-4 flex flex-col items-center justify-center">
            <div class="flex justify-center items-center gap-2">
                <input
                    class="border p-2"
                    type="text"
                    placeholder="Buscar..."
                    value={query.value}
                    onInput={(e: Event) => query.value = (e.currentTarget as HTMLInputElement).value}
                />
                <button class="p-2 bg-blue-500 text-white" onClick={fetchMovies}>🔍</button>
            </div>

            <div class="flex justify-center mt-4 gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                    <button
                        class={`p-1 border ${columns.value === num ? 'bg-red-300' : ''}`}
                        onClick={() => columns.value = num}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <div class="grid gap-4 mt-4" style={{ display: "grid", gridTemplateColumns: `repeat(${columns.value}, 1fr)` }}>
                {movies.value.map(movie => <MovieCard movie={movie} />)}
            </div>
        </div>
    );
}
