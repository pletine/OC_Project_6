class Portfolio {
    constructor(photographerFirstName, mediaList, startTabIndex) {
        document.querySelector('#photographer-portfolio').innerHTML = ``;

        this.html = document.createElement('div');
        this.html.setAttribute('id', 'portfolio');
        this.photographerLikes = 0;

        /* Create Portfolio */
        let tabindexNum = startTabIndex + 4;
        for(let media of mediaList) {
            media.html = MediaFactory.create(photographerFirstName, media, tabindexNum);
            media.html.addEventListener('click', (event) => {
                const eventLightbox = new CustomEvent("lightboxCreation", 
                    {detail: {data:event.target.parentNode.id}});
                window.dispatchEvent(eventLightbox);
            });
            this.html.appendChild(MediaFactory.createFigure(media, tabindexNum+1));
            this.photographerLikes += media.likes;

            document.querySelector('#photographer-portfolio').appendChild(this.html);
            tabindexNum += 2;
        }
    }
}