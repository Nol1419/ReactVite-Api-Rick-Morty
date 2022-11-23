import Character from "./Character";
import { useState, useEffect } from "react";

function NavPage ({page , setPage}) {
  return (
  <header className=" d-flex justify-content-between align-items-center">
    {/* <button 
      className="btn btn-outline-warning btn-sm"
      onClick={() => setPage(page - 1)}
    >
      Page: {page - 1}
    </button> */}
    <p>Page: {page}</p>
    <button 
      className="btn btn-outline-warning btn-sm"
      onClick={() => setPage(page + 1)}
    >
      Page {page}
    </button>
  </header>
  )
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className="container">
    
    <NavPage page = {page} setPage= {setPage}/>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}

    <NavPage page = {page} setPage= {setPage}/>

    </div>
  );
}

export default CharacterList;
