import React, {useState, useEffect} from 'react';
import './App.css';


function App() {

  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [allMemeImgs, setAllMemeImgs] = useState([])
  const [randomImage, setRandomImage] = useState(
    "https://i.imgflip.com/26am.jpg"
  )
  

function handleChange(event){
  const {name} = event.target
  name === "topText" ? setTopText(event.target.value) : setBottomText(event.target.value)
}



useEffect(() => {
  console.log("test run")
  fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => setAllMemeImgs(response.data.memes))
}, [])


const handleSubmit = e => {
  e.preventDefault()
  const randNum = Math.floor(Math.random() * allMemeImgs.length)
  const randMemeImgUrl = allMemeImgs[randNum].url
  setRandomImage(randMemeImgUrl)
}

return (
    <div>
    <form className="meme-form" onSubmit={handleSubmit}>
        <input 
            type="text"
            name="topText"
            placeholder="Top Text"
            value={topText}
            onChange={handleChange}
        /> 
        <input 
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={handleChange}
        /> 
    
        <button>Gen</button>
    </form>
    <div className="meme">
        <img src={randomImage} alt="" /> 
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
    </div>
</div>
  );
}

export default App;
