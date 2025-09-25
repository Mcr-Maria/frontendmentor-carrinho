let produtos = [];
let produtosNoCarrinho = [];
let cupoms = [
    {
        nome: "JHON10",
        desconto: 10,
        validade: "2025-09-30"
    },
    {
        nome: "CEICA15",
        desconto: 15,
        validade: "2025-09-30"
    },
    {
        nome: "ANDHERSON20",
        desconto: 20,
        validade: "2025-08-31"
    }
];

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
                <img src="${produto.image}" alt="" class="w-full h-[200px] object-contain rounded-[10px]">
                <button onclick="addProduto(${produto.id})" class="bg-white h-[40px] flex gap-2 items-center px-4 rounded-[20px] m-auto -translate-y-1/2 text-[10px] uppercase font-bold text-blue-500 fill-blue-500 shadow-md shadow-blue-300 duration-150 cursor-pointer hover:bg-blue-500 hover:text-white hover:fill-white group">
                    <box-icon name='cart-add' class="group-active:animate-bounce duration-150"></box-icon>add ao carrinho
                </button>
                <h6 class="text-[12px] text-blue-500 font-semibold leading-[14px] -mt-2">${produto.category}</h6>
                <h6 class="text-[18px] text-blue-800 font-semibold leading-[20px] line-clamp-1">${produto.title}</h6>
                <h6 class="text-[22px] text-orange-500 font-bold">R$ ${produto.price.toFixed(2)}</h6>
            </div>
        `;
    });
    atualizarCarrinho();
}

function addProduto(id) {
    const produto = produtos.find(produto => produto.id == id)
    if (produto) {
        if(!produtosNoCarrinho.some(produto => produto.id == id)){
            produto.quantity = 1;
            produtosNoCarrinho.push(produto);
        }else{
            // alert("Produto já esta no carrinho")
            produto.quantity += 1;
        }
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinho = document.querySelector("#carrinho");

    carrinho.innerHTML = "";

    produtosNoCarrinho.map(produto => {
        carrinho.innerHTML += `
            <div class="flex gap-3 mt-3 relative">
                <box-icon class="w-[18px] cursor-pointer absolute bottom-full right-0" name='X' onclick="excluirDoCarrinho(${produto.id})"></box-icon>
                <img src="${produto.image}" alt="${produto.title}" class="w-[50px] h-[50px] object-contain">
                <div class="flex-1">
                    <h5 class="text-blue-800 font-semibold leading-[20px] line-clamp-1">${produto.title}</h5>
                    <h5 class="text-orange-500 font-semibold leading-[20px] text-sm">R$ ${produto.price.toFixed(2)}</h5>
                    <div class="flex justify-end fill-blue-500 gap-3 items-center">
                        <box-icon class="w-[18px] cursor-pointer" name='minus-circle' onclick="decrementarProduto(${produto.id})"></box-icon>
                        <span>${produto.quantity}</span>
                        <box-icon class="w-[18px] cursor-pointer" name='plus-circle' onclick="incrementarProduto(${produto.id})"></box-icon>
                    </div>
                </div>
            </div>
        `;
    });
    somarTotal();
}

function incrementarProduto(id){
    const produto = produtosNoCarrinho.find(produto => produto.id == id);
    produto.quantity += 1;
    atualizarCarrinho();
}

function decrementarProduto(id){
    const produto = produtosNoCarrinho.find(produto => produto.id == id);
    if(produto.quantity > 1){
        produto.quantity -= 1;
    }
    atualizarCarrinho();
}

function excluirDoCarrinho(id){
    produtosNoCarrinho = produtosNoCarrinho.filter(produto => produto.id != id);
    atualizarCarrinho();
}

function somarTotal(){
    const span = document.querySelector("#total")
    if(produtosNoCarrinho.length > 0){
        const total = produtosNoCarrinho.reduce((total, produto) => total + (produto.price * produto.quantity), 0);
        span.innerHTML = `Total: R$ ${total.toFixed(2)}`;
    }else{
        span.innerHTML = `Carrinho vazio`;
    }
}

function aplicarCupom(){
    const cupomDigitado = document.querySelector("#cupom").value;
    if(cupoms.some(cupom => cupom.nome.toUpperCase() == cupomDigitado.toUpperCase())){
        
    }else{
        alert("Cupom inválido")
    }
}