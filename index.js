    /* VANILLA JS CONNECT 4 */
   
    let playerRed = 'Red', redscore=0;
    let playerYel ='Yellow', yelscore=0;

    let currPlayer= playerRed;
    const rows=6;
    const columns=7;
    let board;
    let runing=true;
    let currColumn;
    window.onload = ()=> {gameStart()};

    //Getting the elements
    const resetBtn= document.getElementById('reset'); //button to restart
    const score = document.querySelector('#score'); //score 
    const redname= document.getElementById('red');
    const yelname= document.getElementById('yel');
    const buttonNames=document.getElementById('updateNames'); //set new names btn
    const playerTurn=document.querySelector('#h1');
    const audio=document.getElementById('audioClick')
    let gameDiv = document.getElementById('board'); //board
    const optionsButton = document.getElementById('optionsButton'); //Options btn
    const optionsMenu = document.getElementById('optionsMenu'); //Options menu
    const cross =document.getElementById('cross');  //cross mark
    const input=document.querySelectorAll('.inputField') //inputfields for the names

    //EVENT LISTENERS
    optionsButton.addEventListener('click', displayMenu); //open and close
    buttonNames.addEventListener('click',setNames)
    resetBtn.addEventListener('click', resetGame) //resetgame
    cross.addEventListener('click',displayMenu);    
    input.forEach((element)=>{element.addEventListener('keydown', (e)=>{ //pressing enter will also setnames
        if (e.key==='Enter') setNames();
    })});

    /* Functions */
    function displayMenu(){ //open or close menu
        optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
    }

    function setNames(){ //change the names of the players in the scores
        if (redname.value=='' && yelname.value==''){ // in case no names are assigned
            alert('No names assigned!')
            return
        }
        else if (redname.value==yelname.value) { //in case the names are the same
            alert('The names are the same')
            return;
        } else if (redname.value ==''){
            alert('Red has no name!')
            return
        }else if (yelname.value ==''){
            alert('Yellow has no name!')
            return
        }
        playerRed=((redname.value).charAt(0).toUpperCase()+(redname.value).slice(1)).replace(/ne/g, 'nê'); //turns the input into capital
        playerYel=((yelname.value).charAt(0).toUpperCase()+(yelname.value).slice(1)).replace(/ne/g, 'nê');
        if (runing) currPlayer=playerRed
        playerTurn.textContent=`${currPlayer.charAt(0).toUpperCase()+currPlayer.slice(1)}`;
        score.textContent = `${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`;
        displayMenu();
    }

    function resetGame() {
        // Clear the game board
        gameDiv.innerHTML = '';

        // Reset variables
        
        board = [];
        runing = true;
        currColumn = [5, 5, 5, 5, 5, 5, 5];
        

        // Restart the game
        gameStart();
    }

    function gameStart(){ //fill the gamediv with the wholes
        board=[];
        currColumn=[5,5,5,5,5,5,5]
        for(let r=0; r<rows;r++){
            let row=[];
            for (let c=0; c<columns;c++){
                row.push(' ')
                let tile = document.createElement('div'); //creates a div for each row
                tile.id = r.toString() + '-' + c.toString(); //sets the id
                tile.classList.add('tiles')                 //adds the class
                document.getElementById('board').append(tile) //apends the divs
                tile.addEventListener('click', addPiece) // adds the functionality
            }
            board.push(row);
        }
    }

    function addPiece(){
        if(!runing) return // the function doesnt do anything if its not runing

        let coord = this.id.split('-');
        // let r= parseInt(coord[0]);
        let c= parseInt(coord[1]);
        r= currColumn[c]; //the row is gona be the current number of the currColumn arr

        if (r<0) return;
        audio.play();
        if (board[r][c]=== ' ' ){
        board[r][c] = currPlayer;
        currColumn[c]--;
        let tile = document.getElementById(r.toString()+ '-' + c.toString());
        if (currPlayer == playerRed ){
            tile.classList.add('red-piece');
            currPlayer=playerYel;
            playerTurn.style.color = 'yellow'
        } else if (currPlayer== playerYel){
            tile.classList.add('yellow-piece');
            currPlayer=playerRed;
            playerTurn.style.color = 'red'
            
        }
        }
        checkWiner();
        playerTurn.textContent=`${currPlayer.charAt(0).toUpperCase()+currPlayer.slice(1)}`;
        
        
    }

    function checkWiner(){
        for (let c=0;c<columns-3;c++){ //check horizontally
            for (let r=0; r<rows;r++){
                if (board[r][c] !== ' '){
                    if (board[r][c] ===board[r][c+1] && 
                        board[r][c+1]===board[r][c+2] &&
                        board[r][c+2] ===board[r][c+3]){
                            (board[r][c]===playerRed)? redscore++: yelscore++;
                            //update the score
                            score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                            setTimeout(() => {
                                alert(`${board[r][c]} wins!`)
                            }, 100);
                            
                            runing=false;
                        }
                }
            }
        }
        for (let r=0; r<rows-3; r++){ // vertically
            for (let c=0; c<columns;c++){
                if (board[r][c]!==' '){
                    if (board[r][c]===board[r+1][c] &&
                        board[r+1][c]===board[r+2][c] &&
                        board[r+2][c] ===board[r+3][c]){
                            (board[r][c]===playerRed)? redscore++: yelscore++;
                            //update the score
                            score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                            setTimeout(() => {
                                alert(`${board[r][c]} wins!`)
                            }, 100);
                            
                            runing=false;
                        }
                }
            }
        }
        for (let r=0; r<rows-3;r++){ // anti-diagonal
            for (let c=0;c<columns-3;c++){
                if (board[r][c]!==' '){
                    if (board[r][c]===board[r+1][c+1] &&
                        board[r+1][c+1]===board[r+2][c+2] &&
                        board[r+2][c+2]===board[r+3][c+3]){
                            (board[r][c]===playerRed)? redscore++: yelscore++;
                            //update the score
                            score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                            setTimeout(() => {
                                alert(`${board[r][c]} wins!`)
                            }, 100);
                            
                            runing=false;
                        }
                }
            }
        }
        for (let r=0; r<rows;r++){ //diagonal
            for (let c=0;c<columns-3;c++){
                if (board[r][c]!==' '){
                    if (board[r][c]===board[r-1][c+1] &&
                        board[r-1][c+1]===board[r-2][c+2] &&
                        board[r-2][c+2]===board[r-3][c+3]){
                            (board[r][c]===playerRed)? redscore++: yelscore++;
                            //update the score
                            score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                            setTimeout(() => {
                                alert(`${board[r][c]} wins!`)
                            }, 100);
                            
                            runing=false;
                        }
                }
            }
        }
    }

