class PhotographerView {
    displayPhotographer(photographer, media_photographer) {
        let contact_modal = document.querySelector('#contact_modal');

        /* Adapt page if error */
        if(photographer == null || media_photographer == null) {
            let page = document.querySelector('#main');
            page.innerHTML = `<h1>Erreur dans la récupération du photographe ou des médias</h1>`
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

        /* Complete presentation of the photographer */
        let presentation = document.querySelector('.photographer-presentation');
        let name = document.createElement('h1');
        name.innerText = photographer.name;
        let localization = document.createElement('h2');
        localization.innerText = photographer.city + ', ' + photographer.country;
        let description = document.createElement('p');
        description.innerText = photographer.tagline;
        presentation.append(name, localization, description);

        let profile_image = document.querySelector('.photograph-header > img');
        profile_image.src = 'assets/photographers/' + photographer.portrait;

        /* Add the filter */
        new Filter(media_treated);

        /* Update portfolio of the photographer */
        let photographerPortfolioDiv = document.querySelector('#photographer-portfolio');
        photographerPortfolioDiv.appendChild(portfolio_html);

        /* Complete likes informations */
        let likeSection = document.querySelector('.photographer-likes');
        likeSection.innerHTML = 
            `<p>${likes_photographer}<i class="fa-solid fa-heart"></i></p>
            <p>${photographer.price}€/jour</p>`

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