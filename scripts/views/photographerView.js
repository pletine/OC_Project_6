class PhotographerView {
    displayPhotographer(photographer, media_photographer) {
        let main = document.querySelector('#main');
        let contact_modal = document.querySelector('#contact_modal');

        /* Adapt page if error */
        if(photographer == null || media_photographer == null) {
            main.innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`
            return;
        }

        let firstName = photographer.name.split(' ')[0].replace('-', ' ');
        let media_treated = media_photographer; // Variable to modify and manage media
        let likes_photographer = 0;

        /* Create Media Portfolio */
        let portofolio_media = [];
        let portfolio_html = document.createElement('div');
        portfolio_html.setAttribute('id', 'portfolio');
        
        /* Create Portfolio */
        for(let media of media_treated) {
            let htmlMediaElem = null;
            if(media.image) {
                htmlMediaElem = document.createElement('img');
                htmlMediaElem.src = 'assets/images/' + firstName + '/' + media.image;
            } else if (media.video) {
                htmlMediaElem = document.createElement('video');
                htmlMediaElem.src = "assets/images/" + firstName + "/" + media.video;
                htmlMediaElem.type = "video/mp4";
                htmlMediaElem.muted = true;
            } else {
                htmlMediaElem = document.createElement('img');
                htmlMediaElem.textContent = "ERREUR"; 
            }
            htmlMediaElem.addEventListener('click', (event) => {
                let currentLightBox = new Lightbox(event.target.parentNode.id);
                currentLightBox.display();
            });
            media.html = htmlMediaElem;
            portofolio_media.push(media);
        }

        /* Create figure element for portfolio */
        portofolio_media.forEach((elem) => {
            let figure = document.createElement('figure');
            figure.setAttribute('id', elem.id);
            figure.appendChild(elem.html);
            let figcaption = document.createElement('figcaption');
            figure.appendChild(figcaption);
            figcaption.innerHTML = 
                `<h2>${elem.title}</h2>
                <p>${elem.likes}
                    <i class="fa-solid fa-heart"></i>
                </p>`;
            portfolio_html.appendChild(figure);
            likes_photographer += elem.likes;
        });

        /* Write Main content */
        main.innerHTML = `
            <div class="photograph-header">
                <section class="photographer-presentation">
                    <h1>${photographer.name}</h1>
                    <h2>${photographer.city}, ${photographer.country}</h2>
                    <p>${photographer.tagline}</p>
                </section>
                <button class="contact_button" onclick="ContactFormFactory.display()">Contactez-moi</button>
                <img src="assets/photographers/${photographer.portrait}" alt="Image de profile du photographe">
            </div>
            <div id="photographer-portfolio">
                <p>Trier par : </p>
                <div class="filtres">
                    <div class="filtre-pop">Popularité</div>
                    <div class="filtre-date">Date</div>
                    <div class="filtre-titre">Titre</div>
                </div>
            </div>
            <div class="photographer-likes">
                <p>${likes_photographer}<i class="fa-solid fa-heart"></i></p>
                <p>${photographer.price}€/jour</p>
            </div>
        `;
        let photographerPortfolioDiv = document.querySelector('#photographer-portfolio');
        photographerPortfolioDiv.appendChild(portfolio_html);

        /* Create Contact Modal Content */
        let list_input = [
            ["first", "Prénom", "text", "Ex: John"],
            ["last", "Nom", "text", "Ex: Doe"],
            ["email", "E-Mail", "text", "Ex: john.doe@email.com"],
            ["message", "Message", "text"],
        ]
        contact_modal.innerHTML = 
            `<div class="contact_modal">` 
            + ContactFormFactory.create(true, photographer.name, list_input)
            + `</div>`;

        return;
    }
}