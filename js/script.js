let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, /* Math.floor retira o ponto flutuante do math.random*/
    y: Math.floor(Math.random() * 15 + 1) * box
}

/*Função criar o background do jogo*/
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

/*Função criar a cobra no background do jogo*/
function criarCobra() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


document.addEventListener('keydown', update);/*Pegar o evento de clique e chamar a função update*/

/*configura as teclas e trata para a cobra não andar na direção oposta que está atualmente*/
function update(event){
    if (event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    if (event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if (event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if (event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

/*Função de iniciar o jogo*/
function startGame() {
    /*tratando para quando a cobra chegar em um limite lateral, ela vá para o lado oposto*/
    if(snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }
    if(snake[0].x < 0 * box && direction == "left") {
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }
    if(snake[0].y < 0 * box && direction == "up") {
        snake[0].y = 16 * box;
    }

    criarBG(); /* criando o background da tela do jogo*/
    criarCobra(); /*cria a cobrinha na tela*/
    drawFood(); /*desenha a comida na tela*/

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*Condicionais de movimentação da cobra*/
    if (direction == "right") {
        snakeX += box;
    }
    if (direction == "left") {
        snakeX -= box;
    }
    if (direction == "down") {
        snakeY += box;
    }
    if (direction == "up") {
        snakeY -= box;
    }

    /* tratando crescimento da cobra */
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box; /* Math.floor retira o ponto flutuante do math.random*/
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);