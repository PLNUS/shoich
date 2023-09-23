import Character from '../test/charData.json';
import CharMastery from '../test/charMastery.json';

interface Data {
    code: number; // 험체 코드
    name: string; // 험체 이름 + 무기
    WR: number; // WinRate
    PR: number; // PickRate
    SR: number; // 순방Rate
    tier: number; // 티어
};

export function initData() {
    let newCharList: Array<Data> = [];
    Character.map((char, p) => {
        var newData: Data = {
            code: char.code,
            name: CharMastery[p].weapon1 + ' ' + char.name,
            WR: Math.floor(Math.random() * 30),
            PR: Math.floor(Math.random() * 20),
            SR: Math.floor(Math.random() * 50),
            tier: Math.floor(Math.random() * 4) + 1
        };
        newCharList.push(newData);
        if (CharMastery[p].weapon2 !== "None") {
            var newData: Data = {
                code: char.code,
                name: CharMastery[p].weapon2 + ' ' + char.name,
                WR: Math.floor(Math.random() * 30),
                PR: Math.floor(Math.random() * 20),
                SR: Math.floor(Math.random() * 50),
                tier: Math.floor(Math.random() * 4) + 1
            };
            newCharList.push(newData);
        } else if (CharMastery[p].weapon3 !== "None") {
            var newData: Data = {
                code: char.code,
                name: CharMastery[p].weapon3 + ' ' + char.name,
                WR: Math.floor(Math.random() * 30),
                PR: Math.floor(Math.random() * 20),
                SR: Math.floor(Math.random() * 50),
                tier: Math.floor(Math.random() * 4) + 1
            };
            newCharList.push(newData);
        } else if (CharMastery[p].weapon4 !== "None") {
            var newData: Data = {
                code: char.code,
                name: CharMastery[p].weapon4 + ' ' + char.name,
                WR: Math.floor(Math.random() * 30),
                PR: Math.floor(Math.random() * 20),
                SR: Math.floor(Math.random() * 50),
                tier: Math.floor(Math.random() * 4) + 1
            };
            newCharList.push(newData);
        }
    })

    return newCharList;
}

export function gameData() {
} // 9/19 TODO 겜 데이터 해석 및 분류 작업