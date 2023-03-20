class Model {

    constructor() {
        this.data = null;
    }

    async getData() {
        if(this.data == null) {
            const response = await fetch(window.location.pathname + 'data/photographers.json', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            this.data = await response.json();
        }
    }

    async getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        await this.getData();
        const photographers = this.data.photographers;
        
        return ({photographers})
    }

    async getMedia() {
        await this.getData();
        const media = this.data.media;
        
        return ({media})
    }
}
