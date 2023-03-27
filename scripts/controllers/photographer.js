//Mettre le code JavaScript lié à la page photographer.html
class Photographer {
    errorPhotographer() {
        let view = new PhotographerView();
        view.displayPhotographer(null, null);
    }

    async getPhotographerData() {
        let model = new Model();
        const { photographers } = await model.getPhotographers();
        const { media } = await model.getMedia();
        const urlData = model.getUrlParam();
        
        let photographer = photographers.filter(elem => elem.id === Number(urlData.id));
        if(photographer.length === 1) {
            photographer = photographer[0];
            let mediaPhotographer = media.filter(elem => elem.photographerId === Number(urlData.id));

            if(mediaPhotographer) {
                let view = new PhotographerView();
                view.displayPhotographer(photographer, mediaPhotographer);
            } else {
                this.errorPhotographer();
            }
        } else {
            this.errorPhotographer();
        }
    }
}
