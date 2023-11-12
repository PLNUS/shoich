export const sortByPR = (x: any, y: any) => {
    if (x.pickRate !== y.pickRate) return y.pickRate - x.pickRate;
    return y.games - x.games;
};