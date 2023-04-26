class Filter {
    constructor(photographerFirstName, mediaList) {
        this.mediaList = mediaList;
        this.photographerFirstName = photographerFirstName;
        console.log(mediaList);
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

        let fleche = document.createElement('img');
        fleche.src = 'assets/icons/arrowFilter.svg';
        fleche.alt = 'open or close the filter options';
        
        this.htmlFilter.append(fleche, filtrePop, filtreDate, filtreTitre);

        this.initEventListener();

        this.portfolio = new Portfolio(this.photographerFirstName, this.mediaList);
        return this.portfolio;
    }

    initEventListener() {
        let filtrePop = document.querySelector('#filtre-pop');
        filtrePop.addEventListener('click', (event) => {
            console.log(event.target);
            this.mediaList.sort(function (a, b) {
                return a.likes - b.likes;
            });
            this.portfolio = new Portfolio(this.photographerFirstName, this.mediaList);
        });

        let filtreDate = document.querySelector('#filtre-date');
        filtreDate.addEventListener('click', (event) => {
            console.log(event.target);

        });

        let filtreTitres = document.querySelector('#filtre-titres');
        filtreTitres.addEventListener('click', (event) => {
            console.log(event.target);
            this.mediaList.sort(function(a, b) {
                let titre1 = a.title.toUpperCase();
                let titre2 = b.title.toUpperCase();

                if (titre1 < titre2) {
                    return -1;
                }
                if (titre1 > titre2) {
                    return 1;
                }
                // Les titres sont égaux
                return 0;
            });
            this.portfolio = new Portfolio(this.photographerFirstName, this.mediaList);
        });
    }

    // refreshPortfolio() {
    //     let portfolio = document.querySelector('#photographer-portfolio');
    // }

    open() {

    }

    close() {

    }
}