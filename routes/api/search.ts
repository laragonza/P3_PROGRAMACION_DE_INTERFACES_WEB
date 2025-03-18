// /routes/api/search.ts
export const handler = async (req: Request) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmZmYTcxYmU1ZGFhMDBlMTJjMWJjMTMxMjBlM2Q3NSIsIm5iZiI6MTY4NTM4MTkzNS4wMTYsInN1YiI6IjY0NzRlMzJmY2MyNzdjMDBhNzQ2MTYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.raEEljpmsGfGMENtPmE-LFWcBEiDUcFKG5B-8_WQABQ";

  
    if (!query) {
      return new Response(JSON.stringify({ error: "query required" }), { status: 400 });
    }
  
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  
    const data = await response.json();
  
    const movies = (data.results || []).map((movie: any) => ({
      original_title: movie.original_title,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path,
      popularity: Math.min(movie.popularity, 10),
    }));
  
    return new Response(JSON.stringify(movies), {
      headers: { "Content-Type": "application/json" },
    });
  };
  