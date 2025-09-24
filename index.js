let produtos = [];
let produtosNoCarrinho = [];

function buscarProdutos() {

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            produtos = json;
            carregarProdutos(produtos);
        })
}

buscarProdutos();

function carregarProdutos(arrayDeProdutos) {
    const gradeDeProdutos = document.querySelector("#gradeDeProdutos");
    arrayDeProdutos.map(produto => {
        gradeDeProdutos.innerHTML += `
            <div class="p-3" title="${produto.title}">
                <img src="${produto.image}" alt="" class="w-full h-[200px] object-contain rounded-[10px]"">
                <button onclick="addProduto(${{...produto}})" class="bg-white h-[40px] flex gap-2 items-center px-4 rounded-[20px] m-auto -translate-y-1/2 text-[10px] uppercase font-bold text-blue-500 fill-blue-500 shadow-md shadow-blue-300 duration-150 cursor-pointer hover:bg-blue-500 hover:text-white hover:fill-white group">
                    <box-icon name='cart-add' class="group-active:animate-bounce duration-150"></box-icon>add ao carrinho
                </button>
                <h6 class="text-[12px] text-blue-500 font-semibold leading-[14px] -mt-2">${produto.category}</h6>
                <h6 class="text-[18px] text-blue-800 font-semibold leading-[20px] line-clamp-1">${produto.title}</h6>
                <h6 class="text-[22px] text-orange-500 font-bold">R$ ${produto.price.toFixed(2)}</h6>
            </div>
        `;
    })
}

function addProduto(produto) {
    console.log(produto.title);
    
    // const carrinho = document.querySelector("#carrinho");
    // carrinho.innerHTML += `
    //     <div class="flex gap-3 mt-4">
    //         <img src="${produto.image}" alt="${produto.title}" class="w-[60px] h-[60px]">
    //         <div class="flex-1">
    //             <h5 class="text-blue-800 font-semibold leading-[20px] line-clamp-1">${produto.title}</h5>
    //             <h5 class="text-orange-500 font-semibold leading-[20px] text-sm">R$ ${produto.price}</h5>
    //             <div class="flex justify-end mt-4 fill-blue-500 gap-3 items-center">
    //                 <box-icon class="w-[18px] cursor-pointer" name='minus-circle'></box-icon>
    //                 <span>0</span>
    //                 <box-icon class="w-[18px] cursor-pointer" name='plus-circle'></box-icon>
    //             </div>
    //         </div>
    //     </div>
    // `
}