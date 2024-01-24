const campo_campo = document.getElementById("Campo")

function criar_bombas(){
    for(let i = 0; i < 150;i++){
         escolher_linha = Math.ceil(Math.random() * 20)
         escolher_coluna = Math.floor(Math.random() * 25)
         campo_campo.childNodes.item(escolher_linha).childNodes.item(escolher_coluna).className = "bomba"
    }
}

function criar_campo(){
    for(let j = 0;j< 20;j++){
        const linhas = document.createElement("div")
        linhas.className = "linhas"
        for(let i = 0; i<25; i++){
            const quadradinho = document.createElement("div")
            quadradinho.style.height = "20px"
            quadradinho.style.width = "20px"
            quadradinho.style.border = "1px solid black"
            quadradinho.style.textAlign = "center"
            linhas.appendChild(quadradinho)
        }
        campo_campo.appendChild(linhas)
    }
    criar_bombas()

    nmr_bombas()

    colocar_numeros()

    startStop()
}

var qtd_bombas = 0

function nmr_bombas(){
    const pegar_bombas = document.querySelectorAll(".bomba")
    pegar_bombas.forEach(()=>{{
        qtd_bombas++
    }})
}

function mostrar_bombas(){
    const pegar_bombas = document.querySelectorAll(".bomba")
    pegar_bombas.forEach((cada)=>{{
        cada.style.backgroundColor = "black"
    }})
}

function jogar() {
    campo_campo.childNodes.forEach((linha, linhaIndex) => {
        linha.childNodes.forEach((celula, colunaIndex) => {
            celula.addEventListener("click", () => {
                if (celula.className !== "bomba") {
                    if(perdeu == false){
                        clarear_espaços(linhaIndex,colunaIndex)
                        ganhou()
                    }
                }else{
                    perder()
                }
            });
        });
    }
    )
}

function colocar_numeros() {
    campo_campo.childNodes.forEach((linha, linhaIndex) => {
        linha.childNodes.forEach((celula, colunaIndex) => {
            if (celula.className == "bomba") {
                incrementarNumerosAoRedor(linhaIndex, colunaIndex);
            }
        });
    });
}

function incrementarNumerosAoRedor(linhaIndex, colunaIndex) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const novaLinha = linhaIndex + i;
            const novaColuna = colunaIndex + j;

            
            if (novaLinha >= 0 && novaLinha < campo_campo.childNodes.length &&
                novaColuna >= 0 && novaColuna < campo_campo.childNodes[novaLinha].childNodes.length) {

                const celulaAoRedor = campo_campo.childNodes[novaLinha].childNodes[novaColuna];

                
                if (celulaAoRedor.className != "bomba") {
                    const numeroAtual = parseInt(celulaAoRedor.innerText) || 0;
                    celulaAoRedor.innerText = numeroAtual + 1;
                    celulaAoRedor.style.color = "white"
                }
            }
        }
    }
}

var qtd_clicado = 0

function clarear_espaços(linhaIndex, colunaIndex) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

            const novaLinha = linhaIndex + i;
            const novaColuna = colunaIndex + j;

            if (novaLinha >= 0 && novaLinha < campo_campo.childNodes.length &&
                novaColuna >= 0 && novaColuna < campo_campo.childNodes[novaLinha].childNodes.length) {

                const celulaAoRedor = campo_campo.childNodes[novaLinha].childNodes[novaColuna];

                if(celulaAoRedor.className != "clicado" && celulaAoRedor.className != "bomba"){
                    qtd_clicado += 1
                }

                if (celulaAoRedor.className != "bomba") {
                    celulaAoRedor.style.color = "black";
                    celulaAoRedor.style.backgroundColor = "grey"
                    celulaAoRedor.className = "clicado"
                }
            }
        }
    }
}

var perdeu = false

function perder(){
    alert("perdeu")
    perdeu = true
    startStop()

}

function ganhou(){
    quadrados_disponiveis = (20 * 25) - qtd_bombas
    if(qtd_clicado >= quadrados_disponiveis){
        alert("parabéns, você ganhou")
        startStop()

    }
}

var segundos = 0;
var timerInterval;

function contarSegundos() {
  const timer = document.getElementById("Timer");
  timer.innerText = segundos
  segundos += 1;
}

function startStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  } else {
    timerInterval = setInterval(contarSegundos, 1000);
  }
}

criar_campo()

jogar()
