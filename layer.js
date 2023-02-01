
const ul = document.getElementById("layers")
const ulItems = document.getElementById("layers").getElementsByTagName("li")
let layerName = []


let myHandler = function(e) {
    let newLayer = document.createElement("li")
    ul.appendChild(newLayer)
    let layerDivParent = document.createElement("div")
    layerDivParent.setAttribute("class","parentLayer")
    newLayer.appendChild(layerDivParent)
    let layerDiv = document.createElement("a")
    layerDiv.setAttribute("class", "layer")
    layerDiv.setAttribute("tabindex","-1")

    // create remove button
    let lockBtn = document.createElement("button"),
        lockIcon = document.createElement("i")
    lockIcon.setAttribute("class", "fa-solid fa-lock-open")
    lockBtn.setAttribute("id", "lockBtn")

    let removeBtn = document.createElement("button")
    let removeIcon = document.createElement("i")
    removeIcon.setAttribute("class", "fa-solid fa-trash")
    removeBtn.setAttribute("id", "removeBtn")
    // create lock button



    layerDivParent.appendChild(layerDiv)
    layerName.push(e.target.name)
    layerDiv.innerHTML = layerName[layerName.length-1]
    layerDivParent.appendChild(removeBtn)
    lockBtn.appendChild(lockIcon)
    removeBtn.appendChild(removeIcon)
    layerDivParent.appendChild(lockBtn)


    lockBtn.addEventListener("click", function () {
        if(e.target.selectable){
            e.target.selectable = false
            lockIcon.removeAttribute("class")
            lockBtn.setAttribute("class", "fa-solid fa-lock")

        } else{
            e.target.selectable = true
            lockIcon.removeAttribute("class")
            lockBtn.setAttribute("class", "fa-solid fa-lock-open")
        }

    })


    removeBtn.addEventListener("click", function () {
        newLayer.remove()
        layerDivParent.remove()
            canvas.remove(e.target)


        image.clipPath = null

        localStorage.removeItem("svgFile")
        localStorage.removeItem("imgFile")
        canvas.renderAll()


    })
    layerDiv.addEventListener("click", function () {
        canvas.setActiveObject(e.target)

        canvas.requestRenderAll()
    })


    console.log('Doing something with the event', e.target.name)


}

function deleteLayer(){

    console.log("e")

}



//This will listen for when an object is added
canvas.on('object:added', myHandler)




canvas.forEachObject().on('modified', deleteLayer())
