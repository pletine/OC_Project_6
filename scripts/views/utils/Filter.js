class Filter {
    constructor() {
        this.sections = [{ title: 'Popularité', id: 'filtre-pop' },
        { title: 'Date', id: 'filtre-date' },
        { title: 'Titre', id: 'filtre-titres' }]
        this.htmlFilter = document.querySelector('#filtre');

        this.status = false; // true = open, false = closed
        this.activeFilterIndex = 0;

        this.initHtml();
        this.initEventListener();
        this.close(this.activeFilterIndex);
    }

    initHtml() {
        let fleche_img = document.createElement('img');
        fleche_img.src = 'assets/icons/arrowFilter.svg';
        fleche_img.alt = 'open or close the filter options';
        this.arrow = fleche_img;
        this.arrow.setAttribute('tabindex', '3');

        this.sectionsHTML = [];
        for (let section of this.sections) {
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
        for (let i = 0; i < this.sections.length - 1; i++) {
            this.linesHtml.push(ligne_img.cloneNode())
        }
        ligne_img = null;
    }

    initEventListener() {
        for (let i = 0; i < this.sections.length; i++) {
            this.sectionsHTML[i].addEventListener('click', (event) => {
                const eventFilter = new CustomEvent('filterClick',
                    { detail: { data: this.sections[i].title } });
                window.dispatchEvent(eventFilter);
            });
        }

        this.arrow.addEventListener('click', () => {
            if (this.status === false) {
                this.open()
            } else {
                this.close(this.activeFilterIndex)
            }
        });
    }

    orderFilterHTML() {
        this.htmlFilter.append(this.arrow);
        this.htmlFilter.append(this.sectionsHTML[this.activeFilterIndex]);
        this.sectionsHTML[this.activeFilterIndex].setAttribute('tabindex', '4');
        let tabIndexNum = 5;
        let j = 0;
        for (let i = 0; i < this.sectionsHTML.length; i++) {
            if (this.linesHtml[j]) {
                this.htmlFilter.append(this.linesHtml[j]);
            }
            if (i !== this.activeFilterIndex) {
                this.htmlFilter.append(this.sectionsHTML[i]);
                j++;
                this.sectionsHTML[i].setAttribute('tabindex', tabIndexNum);
                tabIndexNum++;
            }
        }
    }

    open() {
        this.orderFilterHTML();
        for (let section of this.sections) {
            let sectionHTML = document.getElementById(section.id);
            sectionHTML.style.display = 'block';
        }
        let lines = document.getElementsByClassName('filter-line');
        for (let line of lines) {
            line.style.display = 'block';
        }
        this.arrow.style.transform = 'rotate(180deg)';
        this.status = true;
    }

    close(nameFilterKeepID) {
        this.activeFilterIndex = nameFilterKeepID;
        this.orderFilterHTML();
        
        for (let section of this.sections) {
            let sectionHTML = document.getElementById(section.id);

            if (section.title !== this.sections[nameFilterKeepID].title) {
                sectionHTML.style.display = 'none';
            }
            sectionHTML.removeAttribute('tabindex');
        }
        let lines = document.getElementsByClassName('filter-line');
        for (let line of lines) {
            line.style.display = 'none';
        }

        this.arrow.style.transform = 'rotate(0)';
        this.status = false;
    }
}