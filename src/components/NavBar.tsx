import React from "react";
 
type Props = {
 isLoggedIn: boolean;
 spotifyLoginUrl?: string;
 accessToken: string;
};
 
const NavBar: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl, accessToken }) => {
 const [currentSearchQuery, setCurrentSearchQuery] = React.useState();
 const [currentSearchResult, setCurrentSearchResult] = React.useState();
 
 const getSearchResults = (query: any) => {
   const access_token = accessToken;
   const searchQuery = query;
   setCurrentSearchQuery(searchQuery);
   console.log("Search Query: " + searchQuery.toString());
   const fetchURL = encodeURI(`q=${searchQuery}`);
   fetch(`https://api.spotify.com/v1/search?${fetchURL}&type=track&limit=3`, {
     method: "GET",
     headers: {
       Authorization: `Bearer ${access_token}`,
     },
   })
     .then((response) => {
       // if (!response.ok) {
       if (!response) {
         throw Error("Response Not Ok");
       }
       return response;
     })
     .then((response) => response.json())
     .then(({ tracks }) => {
       //console.log(tracks && tracks.items ? tracks.items[0].name : "undefined");
       const results: any = [];
       if (tracks && tracks.items) {
         tracks.items.forEach((element: any) => {
           let artists: any = [];
           element.artists.forEach((artist: any) => artists.push(artist.name));
           results.push(
             <ul>
               <li key={element.uri}>
                 <img src={element.album.images[2].url} />
               </li>
               <li>{element.name}</li>
               <li>{artists.join(", ")}</li>
             </ul>,
           );
         });
       }
       setCurrentSearchResult(results);
     });
 };
 
 React.useEffect(() => {}, [currentSearchQuery]);
 
 return (
   <>
     <nav className="navbar navbar-expand-lg navbar-light ">
       <div className="container-fluid">
         <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
           <form className="d-flex">
             <input
               className="form-control me-2"
               type="search"
               placeholder="Recherche dans les titres"
               aria-label="Search"
               onChange={(value) => getSearchResults(value.target.value)}
             />
           </form>
           <span>
             {isLoggedIn ? (
               <i className="logoLogin fa fa-user-circle-o" aria-hidden="true">
                 <a className="login" href="/api/logout">
                   logout
                 </a>
               </i>
             ) : (
               <i className="logoLogin fa fa-user-circle-o" aria-hidden="true">
                 <a className="login" href={spotifyLoginUrl}>
                   login
                 </a>
               </i>
             )}
           </span>
         </div>
       </div>
     </nav>
     <div>{currentSearchResult}</div>
   </>
 );
};
 
export default NavBar;