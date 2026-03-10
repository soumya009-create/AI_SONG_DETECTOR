import { useContext } from "react";
import { Songcontext } from "../SongContext";
import { Get_song } from "../pages/song.api";

const useSong = () => {
  const context = useContext(Songcontext);

  if (!context) {
    throw new Error("useSong must be used within a SongContextProvider");
  }

  const { loading, setloading, song, setsong } = context;

  async function handleGetSong({ mood }) {
    try {
      setloading(true);
      const response = await Get_song({ mood });
      setsong(response.song);
    } catch (error) {
      console.error("Error fetching song:", error);
    } finally {
      setloading(false);
    }
  }

  return { loading, song, handleGetSong };
};

export default useSong;

