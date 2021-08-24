class Favorite{
    constructor() {
        this.favoriteElement = document.querySelector(".content-button");
    }
    
    setup() {
        this.bindEvents();
    }

    bindEvents(){
        this.favoriteElement.addEventListener('click', (event)=>{
            const cPath = event.composedPath();
            const element = cPath.find(element => element.tagName === 'BUTTON');

            if(!element){
                return;
            }

            element.classList.toggle('on');
        });
    }
}

export default Favorite;