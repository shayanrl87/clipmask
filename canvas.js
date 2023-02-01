


const svgElement = document.getElementById("svgFileInput")
const imgElement = document.getElementById("imgFileInput")
const download = document.getElementById("download")


const clipBtn = document.getElementById("clip")
const paths = ["M167.3 -153.8C215.3 -119.3 251.6 -59.6 257.2 5.5C262.7 70.7 237.4 141.4 189.4 169.3C141.4 197.1 70.7 182 16.5 165.5C-37.7 149 -75.4 131.1 -124.8 103.3C-174.1 75.4 -235 37.7 -233.9 1.2C-232.7 -35.4 -169.4 -70.7 -120 -105.2C-70.7 -139.7 -35.4 -173.4 12.1 -185.5C59.6 -197.6 119.3 -188.3 167.3 -153.8", "M180.8 -190.9C220.6 -140.9 229.8 -70.5 212.2 -17.6C194.7 35.4 150.4 70.7 110.5 99.7C70.7 128.7 35.4 151.4 -13.9 165.3C-63.2 179.2 -126.3 184.3 -156.5 155.3C-186.7 126.3 -183.8 63.2 -170.8 13.1C-157.7 -37 -134.3 -74 -104.2 -124C-74 -174 -37 -237 16.7 -253.7C70.5 -270.5 140.9 -240.9 180.8 -190.9","M180.8 -166.4C220.1 -141.4 228 -70.7 220.4 -7.7C212.7 55.4 189.4 110.8 150.1 155.4C110.8 200.1 55.4 234.1 1.8 232.3C-51.9 230.5 -103.7 193 -133 148.4C-162.4 103.7 -169.2 51.9 -165.5 3.7C-161.9 -44.5 -147.8 -89.1 -118.4 -114.1C-89.1 -139.1 -44.5 -144.6 13.1 -157.6C70.7 -170.7 141.4 -191.4 180.8 -166.4","M173.9 -186.8C206.4 -141.4 200.7 -70.7 194.3 -6.4C188 58 181 116 148.5 141C116 166 58 158 0.9 157C-56.1 156.1 -112.2 162.2 -151.2 137.2C-190.2 112.2 -212.1 56.1 -214.7 -2.6C-217.3 -61.3 -200.6 -122.6 -161.6 -167.9C-122.6 -213.2 -61.3 -242.6 4.7 -247.3C70.7 -252 141.4 -232.1 173.9 -186.8","M171.9 -174.7C215 -128.7 237 -64.3 222.5 -14.5C208 35.4 157 70.7 113.9 118.5C70.7 166.4 35.4 226.7 -17.7 244.4C-70.7 262 -141.4 237.1 -169.4 189.3C-197.4 141.4 -182.7 70.7 -165 17.7C-147.4 -35.4 -126.7 -70.7 -98.7 -116.7C-70.7 -162.7 -35.4 -219.4 14.5 -233.9C64.3 -248.3 128.7 -220.7 171.9 -174.7"]

let canvas = new fabric.Canvas("canvas")
    window.onresize = function(){
        canvas.setWidth(window.innerWidth*60/100)
        canvas.setHeight(window.innerHeight*60/100)
    }
    canvas.setWidth(window.innerWidth*60/100)
    canvas.setHeight(window.innerHeight*60/100)

const ctx = canvas.getContext('2d')
fabric.Object.prototype.objectCaching = false


let image = ""
let imageDatas = ""
let svgOutput = ""
let svgDatas = ""
let randomBlob = ""




svgElement.addEventListener("change",function(){

    let reader = new FileReader();
    reader.addEventListener("load", function(){
        localStorage.setItem("svgFile", reader.result)
        let svgData =  localStorage.getItem("svgFile")

        absolutePositioned: true,
        svgDatas = svgData
        
        showObj(svgData)
 
    })

        reader.readAsDataURL(this.files[0]);

    })

    
    imgElement.addEventListener("change",function(){


        let reader = new FileReader();
        reader.addEventListener("load", function(){
            localStorage.setItem("imgFile", reader.result)
            let imgData =  localStorage.getItem("imgFile")
            imageDatas = imgData
            
            fabric.Image.fromURL(imgData, (img)=>{
                img.dirty = true,

                img.name = "image"
                canvas.add(img);
                canvas.renderAll();
                image = img


            })

        })
    
            reader.readAsDataURL(this.files[0]);
    
        })
     
   

   


    

clipBtn.addEventListener("click", ()=>{



    if (svgOutput){

        image.clipPath = svgOutput
        localStorage.setItem("maskfile", image)

        canvas.renderAll()
        console.log("cliped")
    }
    else{
        image.clipPath = randomBlob
        canvas.renderAll()
        console.log("clipwithrandom")
    }
})






download.addEventListener('click', ()=> {


    canvas.forEachObject(function(obj) {
        let bound = obj.getBoundingRect()

        console.log(bound)
        let dataURL = canvas.toDataURL({
        format: 'png',
        quality: 0.8
    });
    console.log(dataURL)
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = dataURL;
    link.click();
    link.delete();
})})

function Add() {


    function generateBlob(){
        let randomNum  = Math.floor( Math.random()*4)
        return paths[randomNum]
    }
    let rect = new fabric.Path(generateBlob())
        rect.set({
            absolutePositioned: true,
            left: canvas.width / 2,
            top: canvas.height / 2,
            originX: 'center',
            originY: 'center',
            fill: "#BB004B",
            name: "randomBlob"
        })


        randomBlob = rect


        localStorage.setItem("svgFile",rect)

        canvas.add(rect);
        canvas.renderAll();

}




function showObj(obj) {


        fabric.Image.fromURL(obj, (svg)=>{
            svg.set({
                absolutePositioned: true,
                left: canvas.width / 2,
                top: canvas.height / 2,
                originX: 'center',
                originY: 'center',
                scaleX: 1,
                scaleY: 1,
                name: "mask"
            })

            canvas.add(svg);

            svgOutput = svg
        })

}


function getCanvasItem() {

    console.log(canvas.getObjects()[0])


}





