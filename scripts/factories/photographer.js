function photographerFactory(data) {
    /**
     * La fonctione qui crée des Photographes
     * const { name, id, city, country, tagline, price, portrait } = data;
     * */

    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        /**
         * La fonction qui crée une carte d'un Photographer
         * @Template
         * <article class="">
         *     <a href="photographers.html?id={id-photographer}" title="{Name-photographer}"
         *            aria-label="Aller sur la page de ${name}"
         *      >
         *         <img src="assets/photographers/{portrait-photographer}" alt="{Name-photographer}">
         *         <h2 class="name">{Name-photographer}</h2>
         *     </a>
         *     <p class="location">{location-phographer}</p>
         *     <p class="tagline">{tagline-photographer}</p>
         *     <p class="price">{prica-photographer}</p>
         * </article>
         * */

        const articlePhotographer = document.createElement( 'article');
        articlePhotographer.className = 'article-photographer';
        let templatePhotographer = `
            <a href="./photographer.html?id=${id}" title="${name}" aria-label="${name}">
                <img src="${picture}" alt="" class="photographer-portrait">
                <h2 class="name">${name}</h2>
            </a>
            <div tabindex="0">
                <p class="location">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
                <p class="price">${price}€/jour</p>
            </div>`;

        articlePhotographer.innerHTML = templatePhotographer;

        return articlePhotographer;
    }

    function getPhotographerProfileHeader() {
        /**
         * La fonction qui crée un Article sur le profile de photographer
         * @Template
         * <article aria-label="Photographer Profil" class="ph-profil">
         *     <div class='ph-infos'>
         *         <h2>${photographers[0].name}</h2>
         *         <p class="ph-city">${photographers[0].city}, ${photographers[0].country}</p>
         *         <p class="ph-tagline">${photographers[0].tagline}</p>
         *         <p>${photographers[0].tags.map(tag => `<a class="ph-tags" href="index.html">#${tag}</a>`).join(" ")}</p>
         *     </div>
         *     <button id="ph-contact" title='Contact Me'>Contactez-moi</button>
         *     <a href='#' title='${photographers[0].alt}'><img src="${photographers[0].portrait}"
         *                                                      alt="${photographers[0].alt}"></a>
         * </article>
         * */
        let templatePhotographerProfil = `
            <article aria-label="Photographer Profil" class="photographer-profile">
                <div class='photographer-infos'>
                    <h2 tabindex="0">${name}</h2>
                    <div tabindex="0">
                        <p class="photographer-city">${city}, ${country}</p>
                        <p class="photographer-tagline">${tagline}</p>
                    </div>
                </div>
                <button id="photographer-contact" title='Contact Me' aria-label="Contact Me">Contactez-moi</button>
                <a href='#' title='${name}'><img src="${picture}" aria-label="${name}" title="${name}" alt=""></a>
            </article>
            `;

        return templatePhotographerProfil;
    }

    /* La fonction qui cree le template de la zone prix et likes */
    async function likesAndPrices(totalLike) {
        let box = document.getElementById('box');
        let boxTemplate = `
                    <span id="total-likes" aria-label="likes">${totalLike}</span>
                    <i class="fas fa-heart" aria-label='likes'></i>
                    <span>${price} €/ jour</span>
                `;
        box.innerHTML = boxTemplate;
    }

    return { name, picture, getUserCardDOM, getPhotographerProfileHeader, likesAndPrices }
}
