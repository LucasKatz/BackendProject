const paragraph = document.getElementById('paragraph')
const input = document.getElementById('input')

const socket = io();

//Listeners
input.addEventListener('click', (event)=>{
    let  newProductToAdd = event.target.value 
    if (event.key === "Enter" ){
        if (input.value.trim().length){
        socket.emit('send_message', newProductToAdd);
    }
    input.value =""
    }
})

//Emitter
socket.on("paragrpah", data =>{
    let html = data.map ( (product) => {
        return <span>Producto: ${product.prod}</span>
    })
    paragraph.innerHTML=html
})