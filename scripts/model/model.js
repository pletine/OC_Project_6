class Model {

    constructor() {
        this.data = null;
    }

    /**
     * Filter the Params contain in the URL and extract them in an array
     * @returns URL Params
     */
    getUrlParams() {
        let params = Object.fromEntries(new URLSearchParams(document.location.search));
        return params;
    }

    getUrlParamByName(name) {
        let param = this.getUrlParams()[name];
        return param;
    }

    /**
     * Récupération de toutes les données contenues dans le fichier "photographes.json" du dossier data
     */
    async getData() {
        if(this.data == null) {
            const response = await fetch('/data/photographers.json', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            this.data = await response.json();
        }
    }

    /**
     * Extraction des données photographers contenues dans le document "photographes.json"
     * @returns Photographes Data
     */
    async getPhotographers() {
        await this.getData();
        const photographers = this.data.photographers;

        return ({photographers})
    }

    /**
     * 
     * @param {Id of the photographer} photographerId
     * @returns Photographer data in an object
     */
    async getPhotographerById(photographerId) {
        const {photographers} = await this.getPhotographers();
        let selectedPhotographers = photographers.filter(elem => elem.id === Number(photographerId));

        if(selectedPhotographers.length === 1) {
            return selectedPhotographers[0];
        } else {
            return null;
        }
    }

    /**
     * Extraction des médias contenues dans le document "photographes.json"
     * @returns Media data
     */
    async getMediaById(idPhotographer) {
        await this.getData();
        const media = this.data.media;

        let photographerMedia = media.filter(elem => elem.photographerId === Number(idPhotographer));

        return (photographerMedia)
    }
}
