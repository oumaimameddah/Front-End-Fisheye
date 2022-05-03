function mediaFactory(data) {
    /**
     * La fonctionne qui crée des medias
     *
     * @constant: folder represent le chemin vers la resource de photographer
     * */
    const folder = getFolderById(data.photographerId);
    const media = data;


    /**
     * La fonction qui donne le template de la media selon son type
     * */
    function createMediaHtml() {
        if (data.hasOwnProperty('image')) {
            return getImageTemplate();
        } else if (data.hasOwnProperty('video')) {
            return getVideoTemplate();
        }
    }

    function getImageTemplate() {
        let imageTemplate = `
            <article class="ph-work-elt">
                <a href="#" title="${data.title}">
                    <img src="assets/sources/${folder}/${data.image}" alt="${data.title}" role="button" class="ph-media">
                </a>
                <div class="ph-work-elt-text">
                    <h2 class="ph-work-title">${data.title}</h2>
                    <span class="ph-work-price">${data.price} €</span>
                    <div class="ph-elt-like">
                        <span class="ph-work-like">
                           <a class="like-counter" id="total-likes">${media.likes}</a>
                        </span>
                        <i class="far fa-heart heart-btn" aria-label='likes' role="button" data-value="${media.likes}"></i>
                    </div>
                </div>
            </article>
        `;
        return imageTemplate;
    }

    function getVideoTemplate() {
        let videoTemplate = `
            <article class="ph-work-elt">
                <a href="#" title="${data.title}" >
                    <video controls="controls" src="assets/sources/${folder}/${data.video}" role="button" class="ph-media"></video>
                </a>
                <div class="ph-work-elt-text">
                    <h2 class="ph-work-title">${data.title}</h2>
                    <span class="ph-work-price">${data.price} €</span>
                    <div class="ph-elt-like">
                                <span class="ph-work-like">
                                    <a class="like-counter">142</a>
                                </span>
                        <i class="far fa-heart heart-btn" aria-label="likes" role="button" data-value="142"></i>
                    </div>
                </div>
            </article>
        `;
        return videoTemplate;
    }

    return { createMediaHtml }
}