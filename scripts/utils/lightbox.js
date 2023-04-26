class Lightbox {
    constructor(idMainImage) {
        /* Get information */
        this.listIds = this.getAllIds();
        this.idMainImage = idMainImage;
        this.htmlLightBox = document.querySelector('#lightbox_modal');
        this.htmlLightBox.innerHTML = ``;

        /* Create and append elements of the lightbox modal */
        let buttonClose = document.createElement('button');
        buttonClose.setAttribute('id', 'btn-close');
        buttonClose.innerText = ' X ';
        
        let buttonNext = document.createElement('button');
        buttonNext.setAttribute('id', 'btn-goNext');
        buttonNext.innerText = ' > ';
        
        let buttonPrec = document.createElement('button');
        buttonPrec.setAttribute('id', 'btn-goPrec');
        buttonPrec.innerText = ' < ';

        let divImage = document.createElement('div');
        divImage.setAttribute('id', 'lightbox-image');

        this.htmlLightBox.append(buttonClose, buttonNext, buttonPrec, divImage);

        /* Init the lightbox */
        this.initEventListener();
        this.refreshImage();
    }

    display() {
        this.htmlLightBox.style.display = "block";
    }
    
    close() {
        this.htmlLightBox.style.display = "none";
    }

    getAllIds() {
        let listMedia = document.querySelectorAll('figure');
        let listIds = [];
        for(let media of listMedia) {
            listIds.push(media.id);
        }
        return listIds;
    }

    initEventListener() {
        let goPrec = document.querySelector('#btn-goPrec');
        goPrec.addEventListener('click', () => {
            this.goLeft();
        });
        let goNext = document.querySelector('#btn-goNext');
        goNext.addEventListener('click', () => {
            this.goRight();
        });
        let close = document.querySelector('#btn-close');
        close.addEventListener('click', () => {
            this.close();
        });
    }

    goLeft() {
        let index = this.listIds.indexOf(this.idMainImage);
        let max_index = this.listIds.length - 1;
        if((index > 0) && (index <= max_index)) {
            index--;
        } else if(index == 0) {
            index = max_index;
        } else {
            index = 0;
            console.log("Erreur index");
        }
        this.idMainImage = this.listIds[index];
        this.refreshImage();
    }
    
    goRight() {
        let index = this.listIds.indexOf(this.idMainImage);
        let max_index = this.listIds.length - 1;
        if((index => 0) && (index < max_index)) {
            index++;
        } else if(index == max_index) {
            index = 0;
        } else {
            index = 0;
            console.log("Erreur index");
        }
        this.idMainImage = this.listIds[index];
        this.refreshImage();
    }

    refreshImage() {
        let imageLightboxDiv = document.getElementById('lightbox-image');
        imageLightboxDiv.textContent = ``;
        let mediaToAdd = document.getElementById(this.idMainImage.toString());

        let mediaClone = mediaToAdd.firstChild.cloneNode()
        imageLightboxDiv.appendChild(mediaClone);
        if(mediaClone instanceof HTMLVideoElement) {
            mediaClone.controls = true;
        }
        let titreElement = mediaToAdd.querySelector('h2').cloneNode(true);
        imageLightboxDiv.appendChild(titreElement);
    }
}