/**
 * Fichier qui simule un Backend
 * */
const getPhotographers = async () => {
    /**
     * La fonction qui récupere les données à partir de fichier JSON (Back-end)
     * */
        // Récupération des données de fichier (Back-end)
    let url = './data/photographers.json';
    let response = await fetch(url, { mode: "no-cors" });
    let data = await response.json();

    // Organisation des données
    const dataPhotographers = [...data.photographers];
    const dataMedias = [...data.media];

    // Retourner le résultat
    return {
        'photographers': dataPhotographers,
        'media': dataMedias
    };
}

/**
 * Avoir la correspondances des noms des users
 * */
const getFolderById = (search) => {
    const data = [
        {
            "idPhotographer": 243,
            "folder": "Mimi"
        },
        {
            "idPhotographer": 930,
            "folder": "Ellie"
        },
        {
            "idPhotographer": 82,
            "folder": "Tracy"
        },
        {
            "idPhotographer": 195,
            "folder": "Marcel"
        },
        {
            "idPhotographer": 527,
            "folder": "Nabeel"
        },
        {
            "idPhotographer": 925,
            "folder": "Rhode"
        }
    ]
    let res = data.find(el => el.idPhotographer === parseInt(search));
    return res.folder;
}

/**
 * Tester si la resources existe
 * */
const resourcesExist = (src, data) => {
    let name = '';
    if (data.hasOwnProperty('image')) {
        name = data.image;
    } else if (data.hasOwnProperty('video')) {
        name = data.video;
    }
    let folder = getFolderById(data.photographerId);
    let url = src + folder + '/' + name;
    let req = new XMLHttpRequest();
    req.open('HEAD', url, false);
    req.send();
    return req.status !== 404;
}