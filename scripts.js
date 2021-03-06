const board = document.querySelector(".board");
        //Apparently I don't need to define these. As long as the id exactly matches it works. 
        //Is defining them best practice?

       /* const bigger = document.querySelector("#bigger");
        const smaller = document.querySelector("#smaller");
        const picker = document.querySelector("#picker");
        const clear = document.querySelector("#clear");

        const grey = document.querySelector("#grey-scale");
        const rainbow = document.querySelector("#rainbow");
        const color = document.querySelector("#color");
        const exit = document.querySelector("#exit");

        const mainBar = document.querySelector("#main-bar");
        const colorBar = document.querySelector("#color-bar");*/
        
        let min = 8;
        smaller.disabled = true;

        function createBoard(num) {    

            //clear the game board
            board.innerHTML = "";
           
            //Sets the number of rows+columns
            board.style.gridTemplateColumns = "repeat(" + num + ", 1fr)";
       
            //Squares the number of rows+columns for total number of squares
            const numSq = num**2;

            //Loops through appending squares to board div
            for(let i=0; i<numSq; i++) {

                const newDiv = document.createElement('div');
                newDiv.id = 'sq'+i;
                newDiv.className = 'game-sq';
                board.appendChild(newDiv);
            }

            //Disables the smaller button if too small and disables the bigger button if too big
            if(min < 4) {
            smaller.disabled = true;
            } else {
            smaller.disabled = false;
            }

            if(min > 62) {
                bigger.disabled = true;
            } else {
                bigger.disabled = false;
            } 
            
            selectColor();
        }
        createBoard(min);
        
        //MAIN BAR BUTTON FUNCTIONS
        ////Bigger Button Function - increases board rows+columns by 2
        bigger.addEventListener('click', () => {
            min+=2;
            createBoard(min);
            //selectColor(); 
        });
        
        ////Smaller Button Function - decreases board rows+columns by 2
        smaller.addEventListener('click', () => {
            min-=2;
            createBoard(min);
            //selectColor(); 
        });

        ////Color Pick Button Function - disables Main Bar and enables Color Bar
        picker.addEventListener('click', () => {
            mainBar.classList.toggle("disabled");
            colorBar.classList.toggle("disabled");
        });
        
        /////Clear Button Function - Redraws board to clear it
        clear.addEventListener('click', () => {
            createBoard(min);
            //selectColor(); 
        });

        //COLOR BAR BUTTON FUNCTIONS

        ////Grey-Scale Color Button - Changes to grey scale color palette
        grey.addEventListener('click', () => {
            selectColor("grey");
        });

        ////Rainbow Color Button - Changes to rainbow color palette
        rainbow.addEventListener('click', () => {
            selectColor("rainbow");
        });

        ////User Defined Color Button - Changes to rainbow color palette
        color.addEventListener('change', () => {
            selectColor("color");
        });

        ////Back Button - Returns to Main Bar
        back.addEventListener('click', () => {
            mainBar.classList.toggle("disabled");
            colorBar.classList.toggle("disabled");
        });

        //COLOR PALETTE FUNCTIONS
        ////Loops through squares, adding eventListeners, increases the alpha of the bg color on each successive mouseover
        function greyScale() {
            const squares = document.querySelectorAll(".game-sq");
                squares.forEach((div) => { 
                    let alpha = 0.1;
                        
                    div.addEventListener('mouseover', () => {
                
                        div.style.backgroundColor = 'rgba(0,0,0,'+alpha+')';
                        if(alpha < 0.8) {
                            alpha+=0.2;
                        } 
                });
            });
        }

        ////Loops through squares, adding eventListeners, changes mouseover bg-color to user selected color
        function userColor() {
            const squares = document.querySelectorAll(".game-sq");
            const value = document.querySelector("#color").value;
                squares.forEach((div) => { 
                    
                    div.addEventListener('mouseover', () => {
                        
                        div.style.backgroundColor = value;
                });
            });
        }

        ////Uses sine waves to create rainbow colors
        function rainbowColor() {

            //rounds the caluclated sine numbers and returns an rgb() code
            function RGB2Color(r,g,b) {
                return '(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
            }

            const squares = document.querySelectorAll(".game-sq");
            let i = 0;
            
            //Loops through each square, adds an eventListener, assigns RGB values with phased sine waves
            squares.forEach((div) => { 
                let alpha = 0.1;
                let freq = 0.5;
                //let freq = 2*Math.PI/12
                let i = 0;
                    
                div.addEventListener('mouseover', () => {
                    let red = Math.sin(freq*i + 0) * 127 + 128;
                    let green = Math.sin(freq*i + 2) * 127 + 128;
                    let blue = Math.sin(freq*i + 4) * 127 + 128;
                    let color = RGB2Color(red,blue,green);
                    div.style.backgroundColor = 'rgb' + color;
                    i+=1;
                });
            });
        }   

        //Selects the proper color function based on user input 
        function selectColor(input) {
            

            if(input == "color") {
                userColor();
            } else if(input == "rainbow") {
                rainbowColor();
            } else {
                greyScale();
            }

        }
        //greyScale();
        //raindbowColor();
        selectColor();