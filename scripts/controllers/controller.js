class Controller {
    async displayListPhotographersController() {
        // Récupère les datas des photographes
        let model = new Model();
        const { photographers } = await model.getPhotographers();
        
        let view = new PhotographerListView();
        view.displayPhotographerList(photographers);
    };
    
    async displayPhotographerController() {
        let model = new Model();
        
        let photographerId = model.getUrlParamByName('id');
        const photographer = await model.getPhotographerById(photographerId);
        const media = await model.getMediaById(photographerId);

        let view = new PhotographerView();
        view.displayPhotographer(photographer, media);
    }

    do() {
        console.log("Hello Word");
    }
}
