/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const url = 'https://platzi-avo.vercel.app/api/avo'
const urlbase= 'https://platzi-avo.vercel.app/'
const appNode = document.querySelector('div#app')
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
            //crear la imagen
            const imagen = document.createElement('img');
            document.body.appendChild(imagen);
            imagen.src= `${urlbase}/${item.image}`
            imagen.className ="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            
            //crear el título
            const title = document.createElement('h2');
            document.body.appendChild(title);
            title.textContent=item.name;
            title.className= 'text-lg text-red-600'; //mejor forma
            //title.style= 'font-size: 2rem' forma alternativa 1
            //title.style.fontSize='2rem'   forma alternativa 2
            
            //crear el precio
            const price = document.createElement('div');
            document.body.appendChild(price);
            price.textContent=formatPrice(item.price);
            price.className= 'text-gray-600';

            const contenedor = document.createElement('div');
            contenedor.append(imagen, title, price); //reduce la cantidad de operaciones
            todosLosItems.push(contenedor);
    
        });
        appNode.append(...todosLosItems);
    });
//tarea: Tranformar el código anterior a async await