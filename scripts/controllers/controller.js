class Controller {
    async displayPhotographersController() {
        // Récupère les datas des photographes
        let model = new Model();
        const { photographers } = await model.getPhotographers();
        
        let view = new PhotographerListView();
        view.displayPhotographerList(photographers);
    };

    do() {
        console.log("Hello Word");
    }
}
