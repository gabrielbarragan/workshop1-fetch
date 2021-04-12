

const url = 'https://platzi-avo.vercel.app/api/avo'
const urlbase= 'https://platzi-avo.vercel.app/'
const appNode = document.querySelector('div#app')

//delegación de eventos escucha los eventos de todo un bloque y lo discrimina segun la etiqueta de un target 
const mensajeAlClick= (event) => {
    if (event.target.nodeName==='H2'){
        window.alert(`¿Vas a llevar un aguacate?`)};}

appNode.addEventListener('click',mensajeAlClick)

const formatPrice = (price) => {
    const nuevoPrecio= new window.Intl.NumberFormat('es-CO',{
        style:'currency',
        currency:'COP',
    }).format(price);
    return nuevoPrecio;
};
//intl api de internacionalización
//2 formato a monedas



//web api
//conectarnos al servidor
window
    .fetch(url)
//procesar la respuesta y convertirla en JSON
    .then(respuesta => respuesta.json())
    
//JSON-> Data -> renderizar información en el browser
    .then(respuestaJson => {
        const todosLosItems=[];//crea el array para reducir la cantidad de operaciones en el dom
        
        respuestaJson.data.forEach((item)=> {
            appNode.className= "grid gap-4 grid-cols-3 pt-6"
            //crear la imagen
            const imagen = document.createElement('img');
            document.body.appendChild(imagen);
            imagen.src= `${urlbase}/${item.image}`
            imagen.className ="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            
            
            //crear el título
            const title = document.createElement('h2');
            document.body.appendChild(title);
            title.textContent=item.name;
            title.className= 'text-lg  font-bold'; //mejor forma
            //title.style= 'font-size: 2rem' forma alternativa 1
            //title.style.fontSize='2rem'   forma alternativa 2
                 
            //hardiness
            const robustez = document.createElement('p');
            document.body.appendChild(robustez);
            robustez.textContent=`Hardiness: ${item.attributes.hardiness}`;
            robustez.className= 'text-md';


            //crear el precio
            const price = document.createElement('div');
            document.body.appendChild(price);
            price.textContent=formatPrice(item.price);
            price.className= 'text-gray-600';

            // Wrap price & title
            // <div class="text-center md:text-left"><price ><title ></div>
            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);
            priceAndTitle.appendChild(robustez)
            

             // Wrap Img and priceAndTitle
             // <div class="md:flex bg-white rounded-lg p-6">
            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-80 cursor-pointer ";
            card.appendChild(imagen);
            card.appendChild(priceAndTitle);

            const body= document.querySelector("body")
            body.className=("bg-green-900");

            const contenedor= document.createElement('div');
            contenedor.append(card);
            todosLosItems.push(contenedor);

    
        });
        appNode.append(...todosLosItems);
    });
//tarea: Tranformar el código anterior a async await