/**
 * Données Généreaux
 * */

const elementGallery = document.getElementById('photographer-works');

/**
 * Fonction de la récupération et affichage des données d'un Photographer
 * @constant { media, photographers } - media et les photographers
 * @constant params - avoir les params de l'URL
 * @constant idPhotographer - identifiant de photographer passer en paramètre id dans l'URL
 * @constant selectedPhotographerData - le photographer identifié
 * @constant mediaGallery - media d'un photographer
 * @constant sectionPhotographerProfile section de photographer
 * */
async function displayPhotographerData(media, photographers, refresh) {
    const params = new URLSearchParams(document.location.search.substring(1));
    const idPhotographer = params.get("id");
    const selectedPhotographerData = photographers.find((photographer) => photographer.id === parseInt(idPhotographer));
    const mediaGallery = media.filter((media) => media.photographerId = idPhotographer);
    await dropDown(media);

    // Afficher la section Photographer Profile
    if (!refresh) {
        const sectionPhotographerProfile = document.getElementById('photographer-header');
        const photographerModel = photographerFactory(selectedPhotographerData);
        sectionPhotographerProfile.innerHTML += photographerModel.getPhotographerProfileHeader();
        // Ajouter les bouton pour le contact
        const contactBtnOpen = document.getElementById('photographer-contact');
        contactBtnOpen.addEventListener('click', launchModal);
    }

    // Afficher la partie Gallery
    await updateMediaGallery(mediaGallery);
}

async function updateMediaGallery(medias) {
    medias.forEach((media) => {
        if (resourcesExist('assets/sources/', media)) {
            elementGallery.innerHTML += mediaFactory(media).createMediaHtml();
        }
    });
}

function likeSubscriber() {
    /**
     * La fonction qui ajoute ou supprime les likes dans les média
     * */
    let media = document.getElementById('photographer-works');

    media.addEventListener('click', (e) => {
        let classListTarget = typeof e.target.classList === 'undefined' ? [] : e.target.classList.value.split(' ');
        let hasClassBtn = -1 !== classListTarget.indexOf('heart-btn');

        if (hasClassBtn) {
            let totalLikes = parseInt(document.getElementById('total-likes').innerHTML);
            let counterLike = e.target.parentNode.firstElementChild.firstElementChild;
            let likeValue = parseInt(counterLike.innerHTML);
            let isLiked = -1 !== classListTarget.indexOf('isLiked');

            document.getElementById('total-likes').innerHTML = isLiked ? --totalLikes : ++totalLikes;
            counterLike.innerHTML = isLiked ? --likeValue : ++likeValue;

            if (isLiked) {
                e.target.classList.remove('isLiked');
                e.target.classList.replace('fas', 'far');
            } else {
                e.target.classList.add('isLiked');
                e.target.classList.replace('far', 'fas');
            }
        }
    })
}

async function dropDown(data) {
    let arrowOpen = document.getElementsByClassName('sort-btn');
    let arrowClose = document.getElementsByClassName('arrow-up-close');
    let hiddenSort = document.getElementsByClassName('hidden-sort');

    if (arrowOpen) {
        arrowOpen[0].addEventListener('click', () => {
            hiddenSort[0].style.display = 'block';
        });
        await sortMedias(data);
    }
    if (arrowClose) {
        arrowClose[0].addEventListener('click', () => {
            hiddenSort[0].style.display = "none";
        });
    }
}

async function sortMedias(data) {
    let mediaArraySort = [];
    let media = data;
    let btnSort = document.querySelector('.sort-btn');
    let hiddenSort = document.getElementsByClassName('hidden-sort');
    let sortBtn = Array.from(document.getElementsByClassName('sort'));

    sortBtn.forEach((btn, index) => btn.addEventListener('click', () => {
        hiddenSort[0].style.display = "none";

        if (index === 0) {
            btnSort.innerHTML = `Popularité`;
            console.log(`Popularité`)
            mediaArraySort = media.sort((a, b) => { // SORT BY POPULARITY
                return b.likes - a.likes
            })

        } else if (index === 1) {
            btnSort.innerHTML = `Date`;
            console.log(`Date`)
            mediaArraySort = media.sort((a, b) => { // SORT BY DATE
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            })

        } else if (index === 2) {
            btnSort.innerHTML = `Titre`;
            console.log(`Titre`)
            mediaArraySort = media.sort((a, b) => { // SORT BY TITLE
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
            })
        }
        displaySortMedia(mediaArraySort);
    }));
}

async function displaySortMedia(mediaArraySort) {
    const { media, photographers } = await getPhotographers();
    document.getElementById("photographer-works").innerHTML = "";
    await displayPhotographerData(mediaArraySort, photographers, true);
}


async function init() {
    const { media, photographers } = await getPhotographers();
    await displayPhotographerData(media, photographers, false);
    likeSubscriber();
}


init()
    .then(r => console.log("OK Page PHOTOGRAPHER"))
    .catch(err => console.error("KO Page PHOTOGRAPHER : ", err));