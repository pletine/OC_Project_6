class MediaFactory {
    /**
     * 
     * @param {string} photographerName nom du photographer
     * @param {object} media object media qui peut être une image ou une vidéo
     * @returns {string} code html pour afficher le média
     */
    static createMediaFigure(photographerName, media) {
        let firstName = photographerName.split(' ')[0].replace('-', ' ');
        let html = ``;

        if(media.image) {
            html = `<img src="assets/images/${firstName}/${media.image}" alt="">`;
        } else if(media.video) {
            html = `<video muted">
                        <source src="assets/images/${firstName}/${media.video}" type="video/mp4">
                        Your browser does not support the video tag !
                    </video>`;
        } else {
            html = `<p>ERREUR</p>`
        }

        html = `<figure id="${media.id}" onclick="LightboxFactory.display(this.id)">` 
                + html
                + `<figcaption>
                    <h2>${media.title}</h2>
                    <p>${media.likes}<i class="fa-solid fa-heart"></i></p>
                    </figcaption>`
                + `</figure>`

        return html;
    }

    static createPortofolio(photographerName, mediaList) {
        let html_portfolio = ``;
        let likes = 0;
        mediaList.forEach ((elem) => {
            html_portfolio += MediaFactory.createMediaFigure(photographerName, elem);
            likes += elem.likes;
        });
        return {likes: likes, html: html_portfolio};
    }

    static createMedia(photographerName, media) {
        let firstName = photographerName.split(' ')[0].replace('-', ' ');
        let html = ``;

        if(media.image) {
            html = `<img src="assets/images/${firstName}/${media.image}" alt="">`;
        } else if(media.video) {
            html = `<video controls muted>
                        <source src="assets/images/${firstName}/${media.video}" type="video/mp4">
                        Your browser does not support the video tag !
                    </video>`;
        } else {
            html = `<p>ERREUR</p>`
        }

        html = `<div class="media ${media.id}">` + html + `</div>`;

        return html;
    }

    static createLightboxPortfolio(photographerName, mediaList) {
        let html = ``;

        mediaList.forEach ((elem) => {
            html += MediaFactory.createMedia(photographerName, elem);
        });
        
        return html;
    }
}