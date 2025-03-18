interface Movie {
    original_title: string;
    release_date: string;
    backdrop_path?: string;
    popularity: number;
}
export default function MovieCard({ movie }: { movie: Movie }) {
    const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

    const imageUrl = movie.backdrop_path 
        ? `${IMAGE_BASE}${movie.backdrop_path}`
        : "https://via.placeholder.com/50";

    const popularityNormalized = Math.min(movie.popularity, 10);
    const popularityPercentage = (popularityNormalized / 10) * 50;

    return (
        <div class="border p-4 text-center flex flex-col items-center justify-center">
            <img src={imageUrl} width="50" height="50" class="rounded" alt={movie.original_title} />
            <h2 style={{ fontSize: "1rem", margin: "4px 0" }}>
                {movie.original_title}
            </h2>
            <p style={{ margin: "4px 0" }}>
                Fecha: {movie.release_date}
            </p>
            <div
                style={{
                    width: "50px",
                    height: "10px",
                    backgroundColor: "#ddd",
                    borderRadius: "4px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${popularityPercentage}px`,
                        height: "100%",
                        backgroundColor: "#62c8e6",
                        transition: "width 0.3s ease-in-out",
                    }}
                />
            </div>
        </div>
    );
}
