class Model {

    constructor() {
        this.data = null;
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
     * Extraction des médias contenues dans le document "photographes.json"
     * @returns Media data
     */
    async getMedia() {
        await this.getData();
        const media = this.data.media;

        return ({media})
    }

    getUrlParam() {
        let params = Object.fromEntries(new URLSearchParams(document.location.search));
        return params;
    }
}
