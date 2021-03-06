/**
 * Données Généreaux
 * */

const elementGallery = document.getElementById('photographer-works');
const mediasWork = [];
var currentMediaIndex;

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
    const mediaGallery = media.filter((el) => parseInt(el.photographerId) === parseInt(idPhotographer));
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
    await updateMediaGallery(mediaGallery, selectedPhotographerData);
}

async function updateMediaGallery(medias, selectedPhotographerData) {
    let likes = 0;
    let index = 0;
    while (mediasWork.length) { mediasWork.pop() }
    medias.forEach((media) => {
        if (resourcesExist('assets/sources/', media)) {
            elementGallery.innerHTML += mediaFactory(media).createMediaHtml(index);
            mediasWork.push({ html: mediaFactory(media).getWorkTemplate(), name: media.title });
            likes += media.likes;
            index += 1;
        }
    });

    // Prices and total likes
    await photographerFactory(selectedPhotographerData).likesAndPrices(likes);
}

// afficher les travaux d'un photographer
function showWork(index) {
    let lightBoxMedia = document.getElementById('works-lightbox-media');
    let lightBoxName = document.getElementById('works-lightbox-name');
    let hiddenSort = document.getElementsByClassName('hidden-sort');
    hiddenSort[0].style.display = "none";
    lightBoxMedia.innerHTML = `${mediasWork[index].html}`;
    lightBoxName.innerHTML = `${mediasWork[index].name}`;
    document.getElementById('works-lightbox').style.display = 'block';
    document.querySelector('.close-lightbox-icon').focus();
    currentMediaIndex = index;
    close();
    previous();
    next();
    keyboard();
}

// fermer le travail d'un photographer
function close() {
    document.querySelector('.close-lightbox-icon').addEventListener('click', () => {
        let lightbox = document.getElementById('works-lightbox');
        lightbox.style.display = 'none';
    });

    document.querySelector('.close-lightbox-icon').addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            let lightbox = document.getElementById('works-lightbox');
            lightbox.style.display = 'none';
        }
    });
}

// ecouter les evenement de clavier
function keyboardCloseModel() {
    // Close Contact Modal
    document.addEventListener('keydown', (key) => {
        if (key.code === "Escape") {
            let modalbg = document.getElementById("form-dialog");
            modalbg.style.display = 'none';
        }
    })
}

// les autres evenement de clavier
function keyboard() {
    document.addEventListener('keydown', (key) => {
        let lightBoxMedia = document.getElementById('works-lightbox-media');
        let lightBoxName = document.getElementById('works-lightbox-name');

        // ESCAPE TO CLOSE
        if (key.code === "Escape") {
            let lightBox = document.getElementById('works-lightbox');
            lightBox.style.display = 'none';
        }

        // ARROW RIGHT TO STEP RIGHT
        else if (key.code === "ArrowRight") {
            currentMediaIndex += 1;

            if (currentMediaIndex > mediasWork.length - 1) {
                currentMediaIndex = 0;
            }

            lightBoxMedia.innerHTML = `${mediasWork[currentMediaIndex].html}`;
            lightBoxName.innerHTML = `${mediasWork[currentMediaIndex].name}`;
        }

        // ARROW LEFT TO STEP LEFT
        else if (key.code === "ArrowLeft") {
            currentMediaIndex -= 1;

            if (currentMediaIndex < 0) {
                currentMediaIndex = mediasWork.length - 1;
            }

            lightBoxMedia.innerHTML = `${mediasWork[currentMediaIndex].html}`;
            lightBoxName.innerHTML = `${mediasWork[currentMediaIndex].name}`;
        }
    });
}

// permet d'afficher le travail précédent dans le lightbox
function previous() {
    document.querySelector('.left-arrow-lightbox').addEventListener('click', () => {
        currentMediaIndex -= 1;
        let lightBoxMedia = document.getElementById('works-lightbox-media');
        let lightBoxName = document.getElementById('works-lightbox-name');

        if (currentMediaIndex < 0) {
            currentMediaIndex = mediasWork.length - 1;
        }

        lightBoxMedia.innerHTML = `${mediasWork[currentMediaIndex].html}`;
        lightBoxName.innerHTML = `${mediasWork[currentMediaIndex].name}`;
    })
}

// le travail qui suit dans le lightbox
function next() {
    document.querySelector('.right-arrow-lightbox').addEventListener('click', () => {
        currentMediaIndex += 1;
        let lightBoxMedia = document.getElementById('works-lightbox-media');
        let lightBoxName = document.getElementById('works-lightbox-name');

        if (currentMediaIndex > mediasWork.length - 1) {
            currentMediaIndex = 0;
        }

        lightBoxMedia.innerHTML = `${mediasWork[currentMediaIndex].html}`;
        lightBoxName.innerHTML = `${mediasWork[currentMediaIndex].name}`;
    })
}

// permet de calculer les likes quand on click sur le coeur
function likeSubscriber() {
    /**
     * La fonction qui ajoute ou supprime les likes dans les média
     * */
    let media = document.getElementById('photographer-works');
    let hearts = Array.from(document.getElementsByClassName("ph-elt-like"));

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
    });

    hearts.forEach((blc, index) => blc.addEventListener("keypress", (e) => {
        let classListTarget = typeof e.target.children[1].classList === 'undefined' ? [] : e.target.children[1].classList.value.split(' ');
        let hasClassBtn = -1 !== classListTarget.indexOf('heart-btn');

        if (hasClassBtn) {
            let totalLikes = parseInt(document.getElementById('total-likes').innerHTML);
            let counterLike = e.target.children[1].parentNode.firstElementChild.firstElementChild;
            let likeValue = parseInt(counterLike.innerHTML);
            let isLiked = -1 !== classListTarget.indexOf('isLiked');

            document.getElementById('total-likes').innerHTML = isLiked ? --totalLikes : ++totalLikes;
            counterLike.innerHTML = isLiked ? --likeValue : ++likeValue;

            if (isLiked) {
                e.target.children[1].classList.remove('isLiked');
                e.target.children[1].classList.replace('fas', 'far');
            } else {
                e.target.children[1].classList.add('isLiked');
                e.target.children[1].classList.replace('far', 'fas');
            }
        }
    }))
}

// affiche et applique le tri selon le choix de l'utilisateur
async function dropDown(data) {
    let arrowOpen = document.getElementsByClassName('sort-btn');
    let arrowClose = document.getElementsByClassName('arrow-up-close');
    let hiddenSort = document.getElementsByClassName('hidden-sort');
    let sortBtn = Array.from(document.getElementsByClassName('sort'));

    if (arrowOpen) {
        arrowOpen[0].addEventListener('click', () => {
            hiddenSort[0].style.display = 'block';
            sortBtn[0].focus();
        });
        await sortMedias(data);
    }
    if (arrowClose) {
        arrowClose[0].addEventListener('click', () => {
            hiddenSort[0].style.display = "none";
        });
    }
}

// tri les media selon le choix de l'utilisateur
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
            mediaArraySort = media.sort((a, b) => { // SORT BY POPULARITY
                return b.likes - a.likes
            })

        } else if (index === 1) {
            btnSort.innerHTML = `Date`;
            mediaArraySort = media.sort((a, b) => { // SORT BY DATE
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            })

        } else if (index === 2) {
            btnSort.innerHTML = `Titre`;
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

    sortBtn.forEach((btn, index) => btn.addEventListener("keypress", (e) => {
        hiddenSort[0].style.display = "none";

        if (e.key === "Enter") {
            if (index === 0) {
                btnSort.innerHTML = `Popularité`;
                mediaArraySort = media.sort((a, b) => { // SORT BY POPULARITY
                    return b.likes - a.likes
                })

            } else if (index === 1) {
                btnSort.innerHTML = `Date`;
                mediaArraySort = media.sort((a, b) => { // SORT BY DATE
                    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                })

            } else if (index === 2) {
                btnSort.innerHTML = `Titre`;
                mediaArraySort = media.sort((a, b) => { // SORT BY TITLE
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                })
            }
            displaySortMedia(mediaArraySort);
        }
    }));
}

// reinitialiser la page selon le tri choisit
async function displaySortMedia(mediaArraySort) {
    const { media, photographers } = await getPhotographers();
    document.getElementById("photographer-works").innerHTML = "";
    await displayPhotographerData(mediaArraySort, photographers, true);
}


async function init() {
    const { media, photographers } = await getPhotographers();
    await displayPhotographerData(media, photographers, false);
    likeSubscriber();
    keyboardCloseModel();
}


init()
    .then(r => console.log("OK Page PHOTOGRAPHER"))
    .catch(err => console.error("KO Page PHOTOGRAPHER : ", err));
