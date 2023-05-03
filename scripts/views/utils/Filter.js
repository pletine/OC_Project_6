class Filter {
    constructor() {
        this.sections = [{title:'Popularité', id:'filtre-pop'},
                        {title:'Date', id:'filtre-date'},
                        {title:'Titre', id:'filtre-titres'}]
        this.htmlFilter = document.querySelector('#filtre');

        this.status = false; // true = open, false = closed
        this.activeFilterIndex = 0;

        let fleche_img = document.createElement('img');
        fleche_img.src = 'assets/icons/arrowFilter.svg';
        fleche_img.alt = 'open or close the filter options';
        this.arrow = fleche_img;

        this.sectionsHTML = [];
        for(let section of this.sections) {
            let sectionHTML = document.createElement('div');
            sectionHTML.setAttribute('id', section.id);
            sectionHTML.innerText = section.title;
            this.sectionsHTML.push(sectionHTML);
        }

        this.linesHtml = [];
        let ligne_img = document.createElement('img');
        ligne_img.src = 'assets/icons/rectangle.svg';
        ligne_img.alt = 'separation entre filtres';
        ligne_img.setAttribute('class', 'filter-line');
        for(let i=0; i<this.sections.length-1; i++) {
            this.linesHtml.push(ligne_img.cloneNode())
        }
        ligne_img = null;

        this.initEventListener();
        this.orderFilterHTML();
        this.close(this.activeFilterIndex);
    }

    initEventListener() {
        for(let i=0; i<this.sections.length; i++) {
            this.sectionsHTML[i].addEventListener('click', () => {
                const eventFilter = new CustomEvent('filterClick',
                {detail: {data: this.sections[i].title}});
                window.dispatchEvent(eventFilter);
            });
        }

        this.arrow.addEventListener('click', () => {
            console.log('Click on arrow');
            if(this.status === false) {
                this.open()
            } else {
                this.close(this.activeFilterIndex)
            }
        });
    }

    orderFilterHTML() {
        this.htmlFilter.append(this.arrow);
        this.htmlFilter.append(this.sectionsHTML[this.activeFilterIndex]);
        let j=0;
        for(let i=0; i<this.sectionsHTML.length; i++) {
            if(this.linesHtml[j]) {
                this.htmlFilter.append(this.linesHtml[j]);
            }
            if(i !== this.activeFilterIndex) {
                this.htmlFilter.append(this.sectionsHTML[i]);
                j++;
            }
        }
    }

    open() {
        for(let section of this.sections) {
            let sectionHTML = document.getElementById(section.id);
            sectionHTML.style.display = 'block';
        }
        let lines = document.getElementsByClassName('filter-line');
        for(let line of lines) {
            line.style.display = 'block';
        }
        this.arrow.style.rotate = '0';
        this.status = true;
    }

    close(nameFilterKeepID) {
        this.activeFilterIndex = nameFilterKeepID;
        
        for(let section of this.sections) {
            let sectionHTML = document.getElementById(section.id);
            
            if(section.title !== this.sections[nameFilterKeepID].title) {
                sectionHTML.style.display = 'none';
            }
        }
        let lines = document.getElementsByClassName('filter-line');
        for(let line of lines) {
            line.style.display = 'none';
        }

        this.orderFilterHTML();

        this.arrow.style.rotate = '180';
        this.status = false;
    }
}