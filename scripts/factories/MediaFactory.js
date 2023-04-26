class MediaFactory {
    static create(photographerFirstName, media) {
        if(media.image) {
            let htmlElem = document.createElement('img');
            htmlElem.src = 'assets/images/' + photographerFirstName + '/' + media.image;
            return htmlElem;
        } else if(media.video) {
            let htmlElem = document.createElement('video');
            htmlElem.src = 'assets/images/' + photographerFirstName + '/' + media.video;
            htmlElem.type = 'video/mp4';
            htmlElem.muted = true;
            htmlElem.controls = false;
            return htmlElem;
        } else {
            let error = document.createElement('img');
            error.textContent = "ERREUR";
            return error;
        }
    }

    static createFigure(elem) {
        let figure = document.createElement('figure');
        figure.setAttribute('id', elem.id);

        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = 
            `<h2>${elem.title}</h2>
            <p>${elem.likes}
                <i class="fa-solid fa-heart"></i>
            </p>`;

        figure.appendChild(elem.html);
        figure.appendChild(figcaption);

        return figure;
    }
}