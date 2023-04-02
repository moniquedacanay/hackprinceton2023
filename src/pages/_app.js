import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
//  getResponseTest();
  return <Component {...pageProps} />
}
/*
function getResponseTest() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': ,
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  
  fetch('https://edamam-recipe-search.p.rapidapi.com/search?q=chicken', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
*/