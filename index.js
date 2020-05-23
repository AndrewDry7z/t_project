'use strict';
window.onload = () => {
    class Figure {
        constructor(type, active, posX, posY) {
            this.type = type;
            this.active = active;
            this.posX = posX;
            this.posY = posY;
        }
    }

    let newFigure = new Figure('dot', true, 5, 0);

    function createNewFigure() {
        if (!newFigure.active) {
            newFigure = new Figure('dot', true, 5, 0);
        }
    }


    let difficulty = 0;
    const field = document.querySelector('.field');
    const fieldCells = field.querySelectorAll('.field__cell');

    let oldFiguresArray = [];


    setInterval(function () {
        moveFigureDown();
        updateField();
    }, ((10 - difficulty) / 10) * 1200)

    function moveFigureDown() {
        if ((newFigure.active && newFigure.posY < 20)
            && !field.querySelector(`[data-y="${newFigure.posY + 1}"][data-x="${newFigure.posX}"]`).classList.contains('old')) {
            newFigure.posY++;
        } else {
            newFigure.active = false;
            oldFiguresArray.push(newFigure);
            field.querySelector(`[data-x="${newFigure.posX}"][data-y="${newFigure.posY}"]`).classList.add('old');
        }
    }

    function updateField() {
        for (let cell of fieldCells) {
            if (!cell.classList.contains('old')) {
                cell.classList.remove('active');
            }
            if ((cell.dataset.y == newFigure.posY) && (cell.dataset.x == newFigure.posX)) {
                cell.classList.add('active');
            }
        }
        console.log(newFigure.posX + ' : ' + newFigure.posY)
        createNewFigure();
    }


    document.addEventListener('keydown', (event) => {
        if (newFigure.active) {
            switch (event.code) {
                case 'ArrowLeft':
                    if ((newFigure.posX >= 2) && (newFigure.posX <= 10)) {
                        --newFigure.posX;
                    }
                    break;
                case 'ArrowRight':
                    if ((newFigure.posX >= 1) && (newFigure.posX <= 9)) {
                        ++newFigure.posX;
                        console.log(newFigure.posX);
                    }
                    break;
                case 'ArrowDown':
                    moveFigureDown();
                    break;
            }
            updateField();
        }
    })

}
