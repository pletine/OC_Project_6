//Mettre le code JavaScript lié à la page photographer.html
class Photographer {
    async getPhotographerData() {
        let model = new Model();
        const { photographers } = await model.getPhotographers();
        const { media } = await model.getMedia();
        const urlData = model.getUrlParam();
        
        let photographer = photographers.filter(elem => elem.id === Number(urlData.id));
        if(photographer.length === 1) {
            photographer = photographer[0];
        } else {
            console.log("Erreur dans la récupération du photographe");
        }
        let mediaPhotographer = media.filter(elem => elem.photographerId === Number(urlData.id));

        let view = new PhotographerView();
        view.displayPhotographer(photographer, mediaPhotographer);
    }
}
