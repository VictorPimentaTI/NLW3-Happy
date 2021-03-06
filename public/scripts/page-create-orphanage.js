//Create map
const map = L.map('mapid').setView([-27.2201829,-49.64607], 15);

//Creat and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
})

let marker;

//Create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //Remove icon
    marker && map.removeLayer(marker)

    //Add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})

// Adicionar cmapo de fotos
function addPhotoField() {
    //Pegar o container de fotos #images
    const container = document.querySelector('#images')

    //Pegar container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')

    //Realizar o clone da última imagem adicionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    //Verificar se o campo esta vázio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value == "" ){
        return
    }

    //Limpar o campo antes de adicionar ao container de imagens
    input.value = ""

   //Add o clone container de #image
    container.appendChild(newFieldContainer)
}

// Excluir imagem 
function deleteField(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1){
        //Limpar o valor do campo
        span.parentNode.children[0].value = ''
        return
    }

   //Deletar campo inteiro 
   span.parentNode.remove();
}

//Select Yes or No
function toggleSelect(event){

    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'))

    const button = event.currentTarget
    button.classList.add('active')

    //Atualiza o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    input.value = button.dataset.value
}