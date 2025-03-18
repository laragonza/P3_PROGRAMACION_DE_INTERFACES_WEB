//import { Head } from "$fresh/runtime.ts";
import MovieSearch from "../islands/MovieSearch.tsx";

export default function Home() {
    return (
        <div class="p-4">

            <div style={{ height: '75px' }} />

            <MovieSearch />
        </div>
    );
}
