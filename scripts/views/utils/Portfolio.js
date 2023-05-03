class Portfolio {
    constructor(photographerFirstName, mediaList) {
        document.querySelector('#photographer-portfolio').innerHTML = ``;

        this.html = document.createElement('div');
        this.html.setAttribute('id', 'portfolio');
        this.photographerLikes = 0;

        /* Create Portfolio */
        for(let media of mediaList) {
            media.html = MediaFactory.create(photographerFirstName, media);
            media.html.addEventListener('click', (event) => {
                const eventLightbox = new CustomEvent("lightboxCreation", 
                    {detail: {data:event.target.parentNode.id}});
                window.dispatchEvent(eventLightbox);
            });
            this.html.appendChild(MediaFactory.createFigure(media));
            this.photographerLikes += media.likes;

            document.querySelector('#photographer-portfolio').appendChild(this.html);
        }
    }
}