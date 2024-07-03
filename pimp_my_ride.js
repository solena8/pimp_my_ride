let tripToParse = "Perdita 8 10 8";

/* étape 1 : rend une ligne du même format que les lignes de l'exemple, la décompose en mot 
(séparés par un espace) puis range ces mots dans une structure de donnée */

function parseTrip(trip) {
    const prospect = new Object();
    trip = trip.split(" ");
    prospect.client = trip[0];
    prospect.start = parseInt(trip[1]);
    prospect.duration = parseInt(trip[2]);
    prospect.price = parseInt(trip[3]);
    return prospect;
}

//parseTrip(tripToParse);

/* Etape 2 : Utilisez la fonction parseTrip(trip) dans une autre fonction parseTrips(trips) prenant en entrée une journée 
complète (donc plusieurs lignes) et retournant une liste de structures trips définies précédemment  ([]). */

let tripsToParse = [
    "Roger 0 5 10",
    "Pongo 3 7 14",
    "Perdita 8 10 8",
    "Anita 16 3 7",
];

function parseTrips(trips) {
    const prospects = [];
    for (trip of trips) {
        prospects.push(parseTrip(trip));
    }
    return prospects;
}

/* Etape 3 :Pour optimiser vos journées, vous décidez d'écrire un code calculant l'enchaînement 
de clients le plus intéressant financièrement.
Créez une fonction `getTripsPrice` qui accepte en argument une liste de `voyages` et retourne 
la somme des prix de cet ensemble de `voyages`. */

function getTripsPrice(trips) {
    let sumPrices = 0;
    for (trip of trips) {
        sumPrices += trip.price;
        //console.log(typeof sumPrices, sumPrices);
    }
    return sumPrices;
}

//getTripsPrice(parseTrips(tripsToParse));

/* Etape 4 : Créez une fonction `checkCompatibility(tripA, tripB)` qui comparent deux structures `voyages` et 
retourne un booléen déterminant si les structures sont compatibles ou non.
Il s'agit de déterminer si un vol (représenté par une structure `trips`) n'empiète pas sur les horaires d'un autre. */

function checkCompatibility(tripA, tripB) {
    //tripA = parseTrip(tripA);
    //tripB = parseTrip(tripB);
    let compatibility = false;
    if (tripA.start + tripA.duration <= tripB.start) {
        compatibility = true;
    }
    //console.log(compatibility);
    return compatibility;
}

//checkCompatibility("Roger 2 3 10", "Pongo 5 1 14");

/* Etape 5 : Développez une fonction findCompatibilities(trips) qui retourne, à partir d'une liste de voyages, tous les 
ensembles de voyages compatibles les uns avec les autres. */

function findCompatibilities(trips) {
    let tripObjects = parseTrips(trips);
    //console.log(tripObjects[1])
    let compatibilityArray = []; //est-ce qu'il y a quelque chose à faire pour éviter de stocker deux fois la même variable ?
    for (let i = 0; i < tripObjects.length; i++) {
        compatibilityArray.push([tripObjects[i]]);
        for (let j = 0; j < tripObjects.length; j++) {
            if (checkCompatibility(tripObjects[i], tripObjects[j])) {
                let tempArray = [];
                tempArray.push(tripObjects[i], tripObjects[j]);
                compatibilityArray.push(tempArray);
            }
        }
    }
    //compatibilityArray.push(trip);
    //console.log(compatibilityArray);
    return compatibilityArray;
}

findCompatibilities(tripsToParse);

/* Etape 6 : Développez une dernière fonction findBestPrice(trips), qui renverra le combo ou le voyage
 seul qui rapportera le plus à votre entreprise. */

function findBestPrice(trips) {
    let compatibilities = findCompatibilities(trips);
    let maxPrice = 0;
    let bestCombo = [];
    for (i = 0; i < compatibilities.length; i++) {
        let temp = getTripsPrice(compatibilities[i]);
        if (temp > maxPrice) {
            maxPrice = temp;
            bestCombo = compatibilities[i];
        }
    }
    console.log(bestCombo);
    return bestCombo;
}

findBestPrice(tripsToParse);
