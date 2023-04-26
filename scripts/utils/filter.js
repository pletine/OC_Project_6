class Filter {
    constructor(media) {
        this.media = media;
        this.htmlFilter = document.querySelector('#filtre');

        let filtrePop = document.createElement('div');
        filtrePop.setAttribute('id', 'filtre-pop');
        filtrePop.innerText = 'Popularité';
        
        let filtreDate = document.createElement('div');
        filtreDate.setAttribute('id', 'filtre-date');
        filtreDate.innerText = 'Date';
        
        let filtreTitre = document.createElement('div');
        filtreTitre.setAttribute('id', 'filtre-titres');
        filtreTitre.innerText = 'Titre';
        
        this.htmlFilter.append(filtrePop, filtreDate, filtreTitre);

        this.initEventListener();
    }

    initEventListener() {
        let filtrePop = document.querySelector('#filtre-pop');
        filtrePop.addEventListener('click', () => {
            this.media = null;
        });
    }

    refreshPortfolio() {
        let portfolio = document.querySelector('#photographer-portfolio');
    }
}