    /* VANILLA JS CONNECT 4 */
   
    let playerRed = 'Red', redscore=0; //to be used to change the colors of the div classes
    let playerYel ='Yellow', yelscore=0;
    let pRed='Red', pYel='Yellow'; //to change the scores and update the currplayer

    let lastTilePlayed;
    let tilesPlayed=[]; //to store the values of the tiles played
    let removeHover;
    let currPlayer= playerRed;
    const rows=6;
    const columns=7;
    let board;
    let runing=true;
    let currColumn;
    window.onload = ()=> {gameStart()};

    //Getting the elements
    const resetBtn= document.getElementById('reset'); //play again btn
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
    const redoBtn = document.getElementById('redo');

    //EVENT LISTENERS
    optionsButton.addEventListener('click', displayMenu); //open and close
    buttonNames.addEventListener('click',setNames)
    resetBtn.addEventListener('click', resetGame) //resetgame
    cross.addEventListener('click',displayMenu);    //close the names menu
    redoBtn.addEventListener('click',redoPlay)
    input.forEach((element)=>{element.addEventListener('keydown', (e)=>{ //pressing enter will also setnames
        if (e.key==='Enter') setNames();
    })});
    window.addEventListener('keydown', (e)=>{
        if (e.key===' ') resetGame();
    })

    /* Functions */
    function redoPlay(){
        if (lastTilePlayed===undefined){
            console.log('No plays played!')
        } else{
            let r= lastTilePlayed[0];
            let c=lastTilePlayed[2];
            let tile = document.getElementById(lastTilePlayed)
            if (board[r][c]===`${playerRed}`) {
                tile.classList.remove('red-piece')
                currPlayer= pRed
                playerTurn.style.color = 'red'

            } else if (board[r][c]===`${playerYel}`){
                tile.classList.remove('yellow-piece')
                currPlayer=pYel
                playerTurn.style.color = 'yellow'

            }
            playerTurn.textContent=`${currPlayer.charAt(0).toUpperCase()+currPlayer.slice(1)}`;   
            tile.style.boxShadow='none';
            if ((currColumn[c]+1) ==r) currColumn[c]++;
            board[r][c]=' ';
            tile.addEventListener('mouseover', hoverPiece);
            
            runing=true
        }

    }
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
        pRed=((redname.value).charAt(0).toUpperCase()+(redname.value).slice(1)).replace(/ne/g, 'nê'); //turns the input into capital
        pYel=((yelname.value).charAt(0).toUpperCase()+(yelname.value).slice(1)).replace(/ne/g, 'nê');
        if (currPlayer==playerRed){
            playerTurn.textContent=`${pRed.charAt(0).toUpperCase()+pRed.slice(1)}`;   
        } else {
            playerTurn.textContent=`${pYel.charAt(0).toUpperCase()+pYel.slice(1)}`;   
        }
        
        score.textContent = `${pRed}: ${redscore} - ${pYel}: ${yelscore}`;
        displayMenu();
    }

    function resetGame(){
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
        board=[]; //board 2d array will be used for the checkwiner function
        currColumn=[5,5,5,5,5,5,5]
        for(let r=0; r<rows;r++){
            let row=[];
            for (let c=0; c<columns;c++){
                row.push(' ')
                let tile = document.createElement('div'); //creates a div for each row
                tile.id = `${r}-${c}`; //sets the id
                tile.classList.add('tiles');                 //adds the class (to make the circles)
                document.getElementById('board').append(tile); //apends the divs
                tile.addEventListener('click', addPiece); // when clicked adds the class for color
                tile.style.transition = 'box-shadow 0.2s ease-in-out';
                tile.addEventListener('mouseover', hoverPiece);
                // tile.addEventListener('click', lastPiece)

            }
            board.push(row);
        }
    }

    function hoverPiece(){
        if (!runing) return
        let tileColumn= this.id[2] //id is 'r-c'
        let tileRow= currColumn[tileColumn]
        let botTileId = `${tileRow}-${tileColumn}`;
        const botTile= document.getElementById(botTileId)
        try{document.getElementById(removeHover).classList.remove(currPlayer)
        } catch (e){
            console.log('Didnt select any yet')
        }
        if (tileRow>=0) {         
            botTile.classList.add(currPlayer)
            this.addEventListener('mouseout',()=>botTile.classList.remove(currPlayer))
    }
    }
    
    
    function addPiece(){
        if(!runing) return // the function doesnt do anything if its not runing
        

        let coord = this.id.split('-'); //returns an array [row, column]
        // let r= parseInt(coord[0]); //no need to set the row because the position will be on the bottom
        let c= parseInt(coord[1]);
        let r= currColumn[c]; //the row is gona be the current number of the currColumn arr
        
        if (r<0) return;
        audio.play();
        for (let i = 0; i < rows; i++) {
            let colTile = document.getElementById(`${i}-${c}`);
            colTile.classList.remove(currPlayer);
        }
        
        lastTilePlayed=`${r}-${c}`; //storing the id of the tile played
        tilesPlayed.push(lastTilePlayed) // this if statement will delete the boxshadow of the previous piece played
        if (tilesPlayed.length>1){
            document.getElementById(tilesPlayed[tilesPlayed.length-2]).style.boxShadow ='';
        }

        if (board[r][c]=== ' ' ){
        board[r][c] = currPlayer;   
        currColumn[c]--;
        let tile = document.getElementById(`${r}-${c}`);
        tile.style.boxShadow='';
        if (currPlayer == playerRed ){ //the game starts with playerRed = 'Red'
            tile.classList.add('red-piece');
            currPlayer=playerYel;
            playerTurn.style.color = 'yellow'
        } else if (currPlayer== playerYel){
            tile.classList.add('yellow-piece');
            currPlayer=playerRed;
            playerTurn.style.color = 'red'
            
        }
        }
        removeHover=`${r-1}-${c}`; // hits the tile above the one last played
        if(r!==0) document.getElementById(removeHover).classList.add(currPlayer) //adds the hover on the upper piece when clicked

        document.getElementById(lastTilePlayed).style.boxShadow ='0 0 10px 10px rgba(0, 0, 0, 0.5)'; //add a effect to the last piece played

        checkWin();
        if (currPlayer==playerRed){
            playerTurn.textContent=`${pRed.charAt(0).toUpperCase()+pRed.slice(1)}`;   
        } else {
            playerTurn.textContent=`${pYel.charAt(0).toUpperCase()+pYel.slice(1)}`;   
        }
    }

    
    function checkWin(){
        
        for (let r=0;r<rows;r++){
            for (let c=0;c<columns;c++){
                
                if (board[r][c]!==' '){
                    if (c<columns-3){ //check horizontaly, (dont need to check last 3 columns)
                    
                            if (board[r][c] ===board[r][c+1] && 
                                board[r][c+1]===board[r][c+2] &&
                                board[r][c+2] ===board[r][c+3]){
                                    if (tilesPlayed.length>1){ //deletes the current boxshadow
                                        document.getElementById(tilesPlayed[tilesPlayed.length-1]).style.boxShadow ='';
                                    }
                                    for (let i=0;i<4;i++){ //adds the wining pieces a boxshadow
                                        let tileId=`${r}-${c+i}`;
                                        let tile = document.getElementById(tileId)
                                        if (tile) {
                                            tile.classList.add('winHover')
                                            document.getElementById(removeHover).classList.remove(currPlayer);
                                        } 
                                        
                                    }
                                    
                                    (board[r][c]===playerRed)? redscore++: yelscore++;
                                    //update the score
                                    score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                                    setTimeout(() => {
                                        alert(`${board[r][c]} wins!`)
                                    }, 250);
                                    
                                    runing=false;
                                }
                    }
                    if (r<rows-3){ //vertically
                        if (board[r][c]===board[r+1][c] &&
                            board[r+1][c]===board[r+2][c] &&
                            board[r+2][c] ===board[r+3][c]){
                                if (tilesPlayed.length>1){ 
                                    document.getElementById(tilesPlayed[tilesPlayed.length-1]).style.boxShadow ='';
                                }
                                for (let i=0;i<4;i++){
                                    let tileId=`${r+i}-${c}`;
                                    let tile = document.getElementById(tileId)
                                    if (tile) {
                                        tile.classList.add('winHover')
                                        document.getElementById(removeHover).classList.remove(currPlayer);
                                    } 
                                }
                                (board[r][c]===playerRed)? redscore++: yelscore++;
                                //update the score
                                score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                                setTimeout(() => {
                                    alert(`${board[r][c]} wins!`)
                                }, 250);
                                
                                runing=false;
                            }
                    }
                    if ((r<rows-3) && (c<columns-3)){ //antidiagonaly \
                        if (board[r][c]===board[r+1][c+1] &&
                            board[r+1][c+1]===board[r+2][c+2] &&
                            board[r+2][c+2]===board[r+3][c+3]){
                                if (tilesPlayed.length>1){ 
                                    document.getElementById(tilesPlayed[tilesPlayed.length-1]).style.boxShadow ='';
                                }
                                for (let i=0;i<4;i++){
                                    let tileId=`${r+i}-${c+i}`;
                                    let tile = document.getElementById(tileId)
                                    if (tile) {
                                        tile.classList.add('winHover')
                                        document.getElementById(removeHover).classList.remove(currPlayer);
                                    } 
                                    
                                }
                                (board[r][c]===playerRed)? redscore++: yelscore++;
                                //update the score
                                score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                                setTimeout(() => {
                                    alert(`${board[r][c]} wins!`)
                                }, 250);
                                
                                runing=false;
                            }
                    } 
                    if ((r>=3) && c<columns-3){ //diagonaly /
                        if (board[r][c]===board[r-1][c+1] &&
                            board[r-1][c+1]===board[r-2][c+2] &&
                            board[r-2][c+2]===board[r-3][c+3]){
                                if (tilesPlayed.length>1){ 
                                    document.getElementById(tilesPlayed[tilesPlayed.length-1]).style.boxShadow ='';
                                }
                                for (let i=0;i<4;i++){
                                    let tileId=`${r-i}-${c+i}`;
                                    let tile = document.getElementById(tileId)
                                    if (tile) {
                                        tile.classList.add('winHover')
                                        document.getElementById(removeHover).classList.remove(currPlayer);
                                    } 
                                    
                                }
                                (board[r][c]===playerRed)? redscore++: yelscore++;
                                //update the score
                                score.textContent=`${playerRed}: ${redscore} - ${playerYel}: ${yelscore}`
                                setTimeout(() => {
                                    alert(`${board[r][c]} wins!`)
                                }, 250);
                                
                                runing=false;
                            }
                    }
                }
            }
        }
        if (!(board.flat().includes(' '))) { //draw
            setTimeout(() => {
                alert(`Draw!`)
            }, 100);
            
            runing=false;
        }
    }
