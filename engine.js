let div = document.getElementById("mostra-pokemon")
let botao = document.getElementById("adiciona-pokemons")
let link = 'https://pokeapi.co/api/v2/pokemon?offset=00&limit=20'
let new_link
let tipoTraduzido = ''


mostraPokemons(link)
  

function mostraPokemons(link){
    
fetch(link)
  .then((response) => response.json())
  .then((json) => {
            json.results.forEach( pokemon => {  
                
                        //CRIA DIV DO CARD    
                        let criaDiv = document.createElement('div')
                        criaDiv.setAttribute('class', 'card')
                        div.appendChild(criaDiv)

                        //CRIA DIV DO NOME DO POKÉMON
                        let divNome = document.createElement('div')
                        divNome.setAttribute('class', 'pokemon-name')
                        criaDiv.appendChild(divNome)

                        //CRIA DIV DA IMAGEM DO POKÉMON
                        let divSprite = document.createElement('div')
                        divSprite.setAttribute('class','pokemon-sprite')
                        criaDiv.appendChild(divSprite)
                        let divImg = document.createElement('img')
                        divSprite.appendChild(divImg)

                       fetch(pokemon.url)
                      .then((response) => response.json())
                      .then((json) => {                         
                        let nomeMaiusculo = json.name.charAt(0).toUpperCase()+json.name.slice(1)
                        let linkImagem = json.sprites.other['official-artwork'].front_default 
                        let tipoDefaultParaClasse = json.types[0].type.name

                        //POPULA AS DIVS DO CARD COM TIPO, NOME E IMAGEM
                        criaDiv.classList.add(tipoDefaultParaClasse) 
                        divNome.textContent = nomeMaiusculo
                        divImg.src = linkImagem
                        
                        //CRIA O CLICK PRA ABRIR O MODAL COM MAIS INFORMAÇÕES
                        criaDiv.addEventListener('click', () =>{
                            
                            json.types.forEach( tipo=>{
                                //SELECIONA O TIPO (OU MAIS DE 1 CASO TENHA) E TRADUZ COM A FUNCTION
                                tipoTraduzido += traduzTipoPokemon(tipo.type.name)+' '  
                            })
                            
                            const modalContainer = document.querySelector('.modal-container')
                            const modal = document.querySelector('.modal')
                            modalContainer.classList.add('mostrar')
                            modal.classList.add(tipoDefaultParaClasse)
                            //INSERE AS INFORMAÇÕES NO CARD DO MODAL
                            modal.innerHTML = `<div class="info-nome">${json.forms[0].name}</div>
                            <div class="modal-img">
                                <img class="img-modal" src="${linkImagem}">
                            </div>
                            <div class="modal-infos">
                                <div class="info-child">HP: ${json.stats[0].base_stat}</div>
                                <div class="info-child">Ataque: ${json.stats[1].base_stat}</div>
                                <div class="info-child">Defesa: ${json.stats[2].base_stat}</div>
                                <div class="info-child">Tipos: ${tipoTraduzido}</div>
                                <div class="info-child">Peso: ${json.weight/10} kg</div>
                                <div class="info-child">Altura: ${json.height/10} m</div>
                            </div> `
                            
                            modalContainer.addEventListener('click',(e) =>{
                                if(e.target.id == 'modal-pokemon-infos'){
                                    document.querySelector('.modal').innerHTML = ''
                                    tipoTraduzido = ''
                                    modalContainer.classList.remove('mostrar')
                                    document.querySelector('.modal').className = 'modal'
                                }                               
                            })                            
                        }
                        )
                      })
                      
            })
              
        new_link = json.next
        }
    );
    
}

//FUNÇÃO PARA TRADUZIR OS TIPOS DE POKÉMONS
function traduzTipoPokemon(tipo){
    switch(tipo){
      case 'fire':
          tipoTraduzido = 'Fogo'
          break
      case 'water':
          tipoTraduzido = 'Água'
          break
      case 'grass':
          tipoTraduzido = 'Planta'
          break
      case 'flying':
          tipoTraduzido = 'Voador'
          break
      case 'fighting':
          tipoTraduzido = 'Lutador'
          break
      case 'poison':
          tipoTraduzido = 'Veneno'
          break
      case 'electric':
          tipoTraduzido = 'Elétrico'
          break
      case 'ground':
          tipoTraduzido = 'Terra'
          break
      case 'rock':
          tipoTraduzido = 'Pedra'
          break
      case 'psychic':
          tipoTraduzido = 'Psíquico'
          break
      case 'ice':
          tipoTraduzido = 'Gelo'
          break
      case 'bug':
          tipoTraduzido = 'Inseto'
          break
      case 'ghost':
          tipoTraduzido = 'Fantasma'
          break
      case 'steel':
          tipoTraduzido = 'Ferro'
          break
      case 'dragon':
          tipoTraduzido = 'Dragão'
          break
      case 'dark':
          tipoTraduzido = 'Sombrio'
          break
      case 'fairy':
          tipoTraduzido = 'Fada'
          break
      case 'unknown':
          tipoTraduzido = '???'
          break
      case 'shadow':
          tipoTraduzido = 'Sombra'
          break
      default:
          tipoTraduzido = 'Normal'
    }
    return tipoTraduzido
}

//BOTÃO QUE ADICIONA POKÉMON
botao.addEventListener('click',function(){
        mostraPokemons(new_link)
})
