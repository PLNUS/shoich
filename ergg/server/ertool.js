function getTier(mmr, tierCut) {
    if (mmr >= tierCut[0]) {
        return getTierTitle(1);
    } else if (mmr >= tierCut[1]) {
        return getTierTitle(2);
    } else if (mmr >= 6000) {
        return getTierTitle(3);
    } else {
        return getTierTitle(27 - Math.floor(mmr / 250));
    }
}

function getTierTitle(tier) {
    if (tier === 1) {
        return '이터니티';
    } else if (tier === 2) {
        return '데미갓';
    } else if (tier === 3) {
        return '미스릴';
    } else if (tier >= 4 && tier <= 7) {
        return '다이아몬드 ' + (tier % 4 + 1);
    } else if (tier >= 8 && tier <= 11) {
        return '플레티넘 ' + (tier % 4 + 1);
    } else if (tier >= 12 && tier <= 15) {
        return '골드 ' + (tier % 4 + 1);
    } else if (tier >= 16 && tier <= 19) {
        return '실버 ' + (tier % 4 + 1);
    } else if (tier >= 20 && tier <= 23) {
        return '브론즈 ' + (tier % 4 + 1);
    } else if (tier >= 24 && tier <= 27) {
        return '아이언 ' + (tier % 4 + 1);
    }
    return '엄';
}

function getTierGroup(mmr, eterCut, demiCut) {
    if (mmr >= eterCut) {
        return 1; // 이+
    } else if (mmr >= demiCut) {
        return 2; // 데
    } else if (mmr >= 6000) {
        return 3; // 미
    } else if (mmr >= 5000 && mmr < 6000) {
        return 4; // 다
    } else if (mmr >= 4000 && mmr < 5000) {
        return 5; // 플
    } else if (mmr >= 3000 && mmr < 4000) {
        return 6; // 골
    } else if (mmr >= 2000 && mmr < 3000) {
        return 7; // 실
    } else if (mmr >= 1000 && mmr < 2000) {
        return 8; // 브
    } else {
        return 0;
    }
}