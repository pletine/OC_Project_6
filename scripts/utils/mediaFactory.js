class MediaFactory {
    /**
     * 
     * @param {string} namePhotographer nom du photographer
     * @param {object} media object media qui peut être une image ou une vidéo
     * @returns {string} code html pour afficher le média
     */
    static createMediaFigure(namePhotographer, media) {
        let firstName = namePhotographer.split(' ')[0].replace('-', ' ');
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

        html = `<figure>` 
                + html
                + `<figcaption>
                    <h2>${media.title}</h2>
                    <p>${media.likes}<i class="fa-solid fa-heart"></i></p>
                    </figcaption>`
                + `</figure>`

        return html;
    }
}