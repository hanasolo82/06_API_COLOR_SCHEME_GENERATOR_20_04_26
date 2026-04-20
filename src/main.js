import convert from "color-convert"




const body = document.querySelector("body")
function renderBody() {

  return body.innerHTML = ` 
      <header class="header">
        <form class="form">
          <label for="colour">COLOR</label>
          <input
            class="input-color"
            name="color"
            id="color"
            placeholder="choose the color"
            type="text"
            minlength="6"
            required
          >
          <button type="button" id="btnAPIrequest">GET</button>
        </form>
      </header>
      <main></main>
      <footer></footer>`
}
renderBody() 
//--------HTML-----elemenst
const inputEl = document.getElementById("color")
const mainDomEl = document.querySelector("main")
const btnGet = document.getElementById("btnAPIrequest")
//------------URL----------------------------------- 
const BaseUrl = "https://www.thecolorapi.com/"
const getRgb =  "id?rgb="
const getHex =  "id?hex="
//---- conver verbal color to other formats-------------
const newValue = inputEl.value.trim().toLowerCase()
//const rgbPattern = convert.keyword.rgb(newValue).join(",") 
//const hexPattern = convert.keyword.hex(newValue)

let timeOut //reinicia timeout
let targetValue = ''
function targetInput(e) {
  clearTimeout(timeOut)

  timeOut = setTimeout(()=>{
    targetValue = e.target.value.trim().toLowerCase()

    console.log(targetValue)
  }, 2000)
  
}
inputEl.addEventListener("input", targetInput)
  



 function getApiColor() {
    
    if(targetInput.length >= 6){
      fetch(`https://www.thecolorapi.com/id?rgb=${targetInput}`)
      .then(res => res.json())
      .then(data => { console.log(data)
        //  handleColor(data)
        //  getSheme(colorPattern, "monochrome", 3)
    })
     console.log("saved correctly")
    }
  }
/*
  function getSheme(rgb, mode, count) {
   
    if(rgb){
    fetch(`https://www.thecolorapi.com/scheme?rgb=${rgb}&mode=${mode}&count=${count}`)
    .then(res => res.json())
    .then(data => {
       
     return  mainDomEl.innerHTML = `
              <div>
                  <ul>
                  ${data.colors.map((color) => {  
                    return`
                    <li >
                      <image src="${color.image.bare}">
                      <p>${color.name.value}</p>
                    </li>
                  `}).join("")}
                  </ul>
              </div>`
    })
    }
  }


function handleColor(colorChosen) {
  if(colorChosen) {
    console.log("you" + colorChosen.name.value)
    console.log('pushing data ok')
  }

}
btnGet.addEventListener("click", getApiColor)

*/
