import axios from "axios";

export function getTier(mmr: number, tierCut: Array<number>) {
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

function getTierTitle(tier: number) {
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

export function getTierGroup(mmr: number) {
    if (mmr >= 6000) {
        return 1; // 이 데 미
    } else if (mmr >= 5000 && mmr < 6000) {
        return 2; // 다
    } else if (mmr >= 4000 && mmr < 5000) {
        return 3; // 플
    } else if (mmr >= 3000 && mmr < 4000) {
        return 4; // 골
    } else {
        return 0; // 광물
    }
}

export async function getTierCut() {
    var eterCut = 0;
    var demiCut = 0;
    const data = await axios.get('https://open-api.bser.io/v1/rank/top/19/3', {
        params: {},
        headers: { 'x-api-key': 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0' }
    }).then(function (response) {
        eterCut = response.data.topRanks.find(e => e.rank === 200).mmr;
        demiCut = response.data.topRanks.find(e => e.rank === 700).mmr;
        console.log('티어컷 계산완료');
        return ([eterCut, demiCut])
    }).catch(function (e) {
        return ([100000, 100000]);
    }).finally(function () {
        return [10000, 10000];
    });
}

export function writeData(json: object) {

}