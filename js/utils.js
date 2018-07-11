function getRatio(img, swap = false) {
    let division = swap ? img.naturalHeight / img.naturalWidth : img.naturalWidth / img.naturalHeight;
    return +division.toFixed(2);
}

export default {getRatio};
