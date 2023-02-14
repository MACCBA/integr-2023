const shopProducts = document.getElementById("contenedor-productos"); 
const lookCart = document.getElementById("cartshop");
const cartContainer = document.getElementById("cart-container");
const cartAmount = document.getElementById("cartAmount");

const productos = [
    {
        precio: 250,
        id: 1,
        title: 'Blond Ale',
        img: 'img/Blonde Ale.jpg', 
        cantidad: 1,
    } ,

    {
        precio: 250, 
        id: 2,
        title: 'Hefeweizen',
        img: 'img/Hefeweizen.jpg', 
        cantidad: 1,
    },

    {
        precio: 250,
        id: 3,
        title: 'Oatmeal Stout',
        img: 'img/Oatmeal Stout.jpg',
        cantidad: 1,
    },

    {
        precio: 250,
        id: 4,
        title: 'Red Ale',
        img: 'img/Irish Red Ale.jpg',
        cantidad: 1,
    },
    {
        precio: 1000,
        id: 5,
        title: 'Growler',
        img: 'img/growler.jpg',
        cantidad: 1,
    },

    {
        precio: 8500,
        id: 6,
        title: 'Barril',
        img: 'img/barriles.jpg',
        cantidad: 1,
    },
];


let carrito = JSON.parse(localStorage.getItem("cart")) || [];   

productos.forEach((beers)=> {
    let beer = document.createElement("div");
    beer.className = "cards";
    beer.innerHTML = `
    <img class= "info-img" src="${beers.img}">
    <h3>${beers.title}</h3>
    <p>${beers.precio} $</p>
    `;

    shopProducts.append(beer);

    let buy = document.createElement("button");
    buy.innerText = "Comprar";
    buy.className = "Comprar";
    beer.append(buy);
    buy.addEventListener("click", () => {

        const repeat = carrito.some((rptBeer) => rptBeer.id === beers.id);
          
        if (repeat){
            carrito.map((beerp) => {
                if(beerp.id === beers.id) {
                    beerp.cantidad++;
                   }
            });
        } else {
           carrito.push({
           id: beers.id,
           img: beers.img,
           title: beers.title,
           precio: beers.precio, 
           cantidad: beers.cantidad,
         });
        }
        cartCount ();  
        saveD ();
    })
});
    const saveD = () => {
    localStorage.setItem("cart", JSON.stringify(carrito));
  
    };


    const printCart = () => {
    
     cartContainer.style.display ="flex";
     cartContainer.innerHTML = ""; 
     const cartHeader = document.createElement("div");
     cartHeader.className = "cart-head";
     cartHeader.innerHTML = `
     <h1 class= "cart-title"> Mis Compras</h1>
     `;

     cartContainer.append(cartHeader);

     const crossCart = document.createElement("h1");
     crossCart.innerText = "❌";
     crossCart.className = "cross-title-button";

     crossCart.addEventListener("click", () => {
        cartContainer.style.display = "none";
     });

     cartHeader.append (crossCart);
     
     carrito.forEach((beers) => {
        let cartContent = document.createElement("div");
     cartContent.className = "cart-cont"
     cartContent.innerHTML = `
       <img class= "img-cart" src="${beers.img}">
       <h3> ${beers.title}</h3>
       <p>${beers.precio} $ </p>
       <p>Cantidad: ${beers.cantidad}</p>
       <p>Total: ${beers.cantidad *beers.precio}</p> 
     `;

     cartContainer.append(cartContent);

      let dlt = document.createElement("span");
       dlt.innerText = "❌";
       dlt.className = "dlt-beer";
       cartContent.append (dlt);

       dlt.addEventListener("click", dltBeer )
     });
      


    const sumaTotal = carrito.reduce((acu, beers) => acu + beers.precio * beers.cantidad, 0);
    
    const totalShop = document.createElement("div");
    totalShop.className = "suma-total"
    totalShop.innerHTML = `TOTAL: ${sumaTotal}$ `;
    cartContainer.append (totalShop);     
    };
    
    lookCart.addEventListener("click", printCart);
    
    const dltBeer = () => {
        const foundId = carrito.find((beers) => beers.id );

        carrito = carrito.filter((beersId) => {
            return beersId !== foundId;
        });
        cartCount();
        saveD ();
        printCart();
    }; 

     const cartCount = () => {
        cartAmount.style.display = "block";
        const cartL = carrito.length;

        localStorage.setItem("cartC", JSON.stringify(cartL))

        cartAmount.innerText = JSON.parse(localStorage.getItem("cartC"))
     };

     cartCount();