import convert from "color-convert"

const body = document.querySelector("body")
function renderBody() {

  return body.innerHTML = ` 
      <header class="header">
          
          <input
            class="input-color"
            name="color"
            id="color"
            placeholder="choose the color"
            type="text"
            minlength="6"
            required
          >
          <select id="mode" name="name">
            <option value="monochrome">monochrome</option>
            <option value="monochrome-dark">monochrome-dark</option>
            <option value="monochrome-light">monochrome-light</option>
            <option value="analogic">analogic</option>
            <option value="complement">complement</option>
            <option value="analogic-complement">analogic-complement</option>
            <option value="triad">triad</option>
            <option value="quad">quad</option>
          </select>
          <button type="button" id="btnAPIrequest">GET</button>
      </header>
      <main></main>
      <footer></footer>`
}
renderBody() 
//--------HTML-----elemenst

const inputEl = document.getElementById("color")
const mainDomEl = document.querySelector("main")
const btnGet = document.getElementById("btnAPIrequest")
const selecEl = document.getElementById("mode") 

//------------URL----------------------------------- 
const BaseUrl = "https://www.thecolorapi.com/"
const getHex =  "id?hex="

//listeners
btnGet.addEventListener("click", handleRequest) // render

let timeOut //reinicia timeout

function handleRequest() {
  
    const color = inputEl.value.trim().toLowerCase()
    const mode = selecEl.value
    if (color.length < 6) {
    alert("Introduce un color válido (mínimo 6 caracteres numeral)")
    return
  }
    getApiColor(color, mode, 4)
    

}

// API FUNCTIONS----------------------------
 function getApiColor(color, mode, numb) {
    
    if(color.length >= 6){
      fetch(BaseUrl + getHex + color)
      .then(res => res.json())
        .then(data => { 
          colorPlaceHolder(data)
       
            fetch(`${BaseUrl}scheme?hex=${color}&mode=${mode}&count=${numb}`)
              .then(res => res.json())
                .then(data => {
                  renderColors(data)
                  })
        })
     } 
  }
  function colorPlaceHolder(color) {
    inputEl.style.backgroundColor = color.name.closest_named_hex
    inputEl.style.color = color.contrast.value
   }

function renderColors(color) {
  return  mainDomEl.innerHTML = `
              <div>
                  <ul>
                  ${color.colors.map((color) => {  
                    return`
                    <li >
                      <image src="${color.image.bare}">
                      <p>${color.name.value}</p>
                    </li>
                  `}).join("")}
                  </ul>
              </div>`
}
