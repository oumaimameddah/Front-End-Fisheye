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
    function createMediaHtml(index) {
        if (data.hasOwnProperty('image')) {
            return getImageTemplate(index);
        } else if (data.hasOwnProperty('video')) {
            return getVideoTemplate(index);
        }
    }

    function getImageTemplate(index) {
        let imageTemplate = `
            <article class="ph-work-elt">
                <a href="#" title="${data.title}" onclick="showWork(${index})">
                    <img src="assets/sources/${folder}/${data.image}" alt="${data.title}" role="button" class="ph-media">
                </a>
                <div class="ph-work-elt-text">
                    <h2 class="ph-work-title" tabindex="0">${data.title}</h2>
                    <div class="ph-elt-like" tabindex="0">
                        <span class="ph-work-like">
                           <a class="like-counter" aria-label="likes">${media.likes}</a>
                        </span>
                        <i class="far fa-heart heart-btn" aria-label='likes' role="button" data-value="${media.likes}"></i>
                    </div>
                </div>
            </article>
        `;
        return imageTemplate;
    }

    function getVideoTemplate(index) {
        let videoTemplate = `
            <article class="ph-work-elt">
                <a href="#" title="${data.title}" onclick="showWork(${index})">
                    <video controls="controls" src="assets/sources/${folder}/${data.video}" role="button" class="ph-media"></video>
                </a>
                <div class="ph-work-elt-text">
                    <h2 class="ph-work-title" tabindex="0">${data.title}</h2>
                    <div class="ph-elt-like" tabindex="0">
                                <span class="ph-work-like">
                                    <a class="like-counter" aria-label="likes">${media.likes}</a>
                                </span>
                        <i class="far fa-heart heart-btn" aria-label="likes" role="button" data-value="${media.likes}"></i>
                    </div>
                </div>
            </article>
        `;
        return videoTemplate;
    }
    
    function getWorkTemplate() {
        if (data.hasOwnProperty('image')) {
            let imageTemplate = `
                <img src="assets/sources/${folder}/${data.image}" alt="${data.title}" role="button" class="ph-media">
            `;
            return imageTemplate;
        } else if (data.hasOwnProperty('video')) {
            let videoTemplate = `
                <video controls="controls" src="assets/sources/${folder}/${data.video}" role="button" class="ph-media"></video>
            `;
            return videoTemplate;
        }
    }

    return { createMediaHtml, getWorkTemplate }
}