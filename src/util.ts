// get a random number within a range
function random( min: number, max: number ) {
    return min + Math.random()*(max-min);
}

// calculate the distance between two points
function calculateDistance( p1x: number, p1y: number, p2x: number, p2y: number ) {
    return Math.sqrt((p1x-p2x)*(p1x-p2x) + (p1y-p2y)*(p1y-p2y));
}
// current year
function year(): number {
    return new Date().getFullYear();
}

export {random, calculateDistance, year}
