const formulario = document.getElementById('formulario')
const labelResult = document.getElementById('result')
const labelResposta = document.getElementById('response')
        
formulario.
onsubmit = function (e){
    e.preventDefault()

    const jsonInput = document.getElementById('jsonFile')
    const address = document.getElementById('address').value
    const files = jsonInput.files

    console.log(files)
    if(files.length<=0){
        return alert("Arquivo JSON não inserido!")
    }
    if(!address.length){
        return alert("Endereço de servidor inválido!")
    }

    const fr = new FileReader
    fr.onload = function(e){
        const result = JSON.parse(e.target.result)
        console.log(result)
        const formatado = JSON.stringify(result,null,2)
        labelResult.innerText=formatado;
    }
    fr.readAsText(files.item(0))
    sendJSON(result, address)
}

async function sendJSON(object, address){
    const request = fetch(
        "http://"+address,
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        }
    ).then(rawRes=>{
        labelResposta.innerText = rawRes
    }).catch(error=>{
        labelResposta.innerText = error
    })
    
}

const address = document.getElementById("address").value