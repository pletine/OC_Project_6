class Model {

    constructor() {
        this.data = null;
    }

    /**
     * Filter the Params contain in the URL and extract them in an array
     * @returns URL Params
     */
    getUrlParams() {
        return Object.fromEntries(new URLSearchParams(document.location.search));
    }

    /**
     * Retourne le paramètre désiré à partir du nom en paramètre
     * @param {Nom du paramètre souhaité} name 
     * @returns 
     */
    getUrlParamByName(name) {
        return this.getUrlParams()[name];
    }

    /**
     * Récupération de toutes les données contenues dans le fichier "photographes.json" du dossier data
     */
    async getData() {
        if(this.data == null) {
            const dataLocalStorage = JSON.parse(window.localStorage.getItem('data'));

            if(dataLocalStorage === null) {
                const response = await fetch('data/photographers.json', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                this.data = await response.json();
                window.localStorage.setItem('data', JSON.stringify(this.data))
            } else {
                this.data = dataLocalStorage;
            }
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
     * Récupération des données d'un photographer selon l'id donné en paramètre
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
     * Extraction des médias contenues dans le document "photographes.json" selon l'id du photographer
     * @param {Id of the photographer} photographerId
     * @returns Media data
     */
    async getMediaById(idPhotographer) {
        await this.getData();
        const media = this.data.media;

        let photographerMedia = media.filter(elem => elem.photographerId === Number(idPhotographer));

        return (photographerMedia)
    }
}
