const starImageSourceMap = {
    empty: './src/img/아이콘_별_3.png',
    harf: './src/img/아이콘_별_2.png',
    full: './src/img/아이콘_별_1.png',
 }

class StarPoint {

    constructor() {
        this.starContentElement = document.querySelector('.content-star');
        this.starBackgroundElement = this.starContentElement.querySelector('.star-background');
        this.starimages = this.starBackgroundElement.querySelectorAll('img');
        this.starPointResetButton = this.starContentElement.querySelector('.icon-remove-star');
        this.lockedStarPoint = false;
    }

    setup(){
        this.bindEvent();
    }

    lockStarPoint() {
        this.lockedStarPoint = true;
    }

    unlockStarPoint() {
        this.lockedStarPoint = false;
    }

    isLockedStarPoint(){
        return this.lockedStarPoint;
    }

    bindEvent() {
        this.starBackgroundElement.addEventListener('mousemove', (event)=>{
                
            const { target, offestX: currentUserPoint } = event;

            if(this.isLockedStarPoint()) {
                return;
            }
            

            const { point } = target.dataset;
            const starPointIndex = parseInt(point, 10) -1;
            const [starImageClientRect] = target.getClientRects();
            const starImageWidth = starImageClientRect.width;
            const isOverHarf = starImageWidth / 2 < currentUserPoint;

            this.renderStarPointImages({ drawableLimitIndex: starPointIndex, isOverHarf });
        });

        this.starBackgroundElement.addEventListener('click', () => this.lockStarPoint());

        this.starPointResetButton.addEventListener('click', () => {
            this.unlockStarPoint();
            this.resetStarPointImages();
        });

        this.starBackgroundElement.addEventListener('mouseout', () =>{
            !this.isLockedStarPoint() && this.resetStarPointImages();
        });
    }

    renderStarPointImages(payload ={}) {
        const {drawableLimitIndex = -1, isOverHarf = false} = payload;

        Array.prototype.forEach.call(this.starimages, (starimage, index)=> {
            let imageSource = index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;

            if(drawableLimitIndex === index){
                imageSource = isOverHarf ? starImageSourceMap.full : starImageSourceMap.harf;
            }
            starimage.src = imageSource;
        });
    }

    resetStarPointImages() {
        this.renderStarPointImages();
    }
}

 export default StarPoint