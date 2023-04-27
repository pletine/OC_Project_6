class Filter {
    constructor() {
        this.htmlFilter = document.querySelector('#filtre');
        this.status = false; // True = open, False = closed

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
    }

    initEventListener() {
        let filtrePop = document.querySelector('#filtre-pop');
        filtrePop.addEventListener('click', (e) => {
            const event = new CustomEvent("filterClick", 
                {detail: {data: 'Populaire'}});
            window.dispatchEvent(event);
        });

        let filtreDate = document.querySelector('#filtre-date');
        filtreDate.addEventListener('click', (e) => {
            const event = new CustomEvent("filterClick", 
                {detail: {data: 'Date'}});
            window.dispatchEvent(event);
        });

        let filtreTitres = document.querySelector('#filtre-titres');
        filtreTitres.addEventListener('click', (e) => {
            const event = new CustomEvent("filterClick", 
                {detail: {data: 'Titres'}});
            window.dispatchEvent(event);
        });
    }

    open() {

    }

    close() {

    }
}