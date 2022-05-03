
const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

const init = async () => {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    await displayData(photographers);
}

init()
    .then(r => console.log("OK Page INDEX"))
    .catch(err => console.error("KO Page INDEX", err));
    