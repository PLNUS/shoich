const express = require('express'); // express 임포트
const SCHEDULE_PORT = 8010;
const app = express(); // app생성
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0';

const CharPiece = {
    "grades": [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    ],
    "scores": [
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    ],
    "avgdeal": [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    ],
    "tk": [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    ]
};

const SynAndItemPiece = {
    "data": [
        [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    ]
}

// Items
let itemData = [];

async function parseArmor(l10n) {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/ItemArmor', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    response.data.data.map((armor, p) => {
                        if (armor.itemGrade === "Epic" || armor.itemGrade === "Legend") {
                            itemData.push({
                                name: armor.name,
                                code: armor.code,
                                grade: armor.itemGrade,
                            })
                        }
                    });
                }
                resolve("성공")
            }).catch(function (error) {
                rejects(error);
            });
    })
}

async function parseWeapon(l10n) {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/ItemWeapon', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    response.data.data.map((weapon, p) => {
                        if (weapon.itemGrade === "Epic" || weapon.itemGrade === "Legend") {
                            itemData.push({
                                name: weapon.name,
                                code: weapon.code,
                                grade: weapon.itemGrade,
                                weaponType: weapon.weaponType
                            })
                        }
                    });
                }
                resolve("성공")
            }).catch(function (error) {
                rejects(error);
            });
    })
}

async function updateMastery(l10n) {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/CharacterMastery', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    let masteryList = [];
                    let charData = [];
                    let synData = [];
                    let itemData = [];
                    let traitData = [];
                    response.data.data.map((mastery, p) => {
                        const basicName = "Character/Name/" + mastery.code;
                        const index = l10n.indexOf(basicName) + basicName.length;
                        const endIndex = l10n.indexOf("\r", index);

                        const charName = l10n.substring(index + 1, endIndex);

                        masteryList.push({
                            code: mastery.code,
                            weapon1: mastery.weapon1,
                            weapon2: mastery.weapon2,
                            weapon3: mastery.weapon3,
                            weapon4: mastery.weapon4
                        });
                        charData.push({
                            code: mastery.code,
                            name: charName,
                            grades: CharPiece.grades,
                            scores: CharPiece.scores,
                            avgdeal: CharPiece.avgdeal,
                            tk: CharPiece.tk
                        });
                        synData.push({
                            code: mastery.code,
                            synergy: SynAndItemPiece.data
                        });
                        itemData.push({
                            code: mastery.code,
                            items: SynAndItemPiece.data
                        });
                        traitData.push({
                            code: mastery.code,
                            trait: SynAndItemPiece.data
                        });
                    });
                    fs.writeFile('base/charData.json', JSON.stringify(charData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/charData updated')
                    });
                    fs.writeFile('base/synergyData.json', JSON.stringify(synData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/synergyData updated')
                    });
                    fs.writeFile('base/itemData.json', JSON.stringify(itemData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/itemData updated')
                    });
                    fs.writeFile('base/traitData.json', JSON.stringify(traitData.), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/traitData updated')
                    });
                    fs.writeFile('parsed/charMastery.json', JSON.stringify(masteryList), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('parsed/mastery updated')
                    });
                }

                resolve("성공")
            }).catch(function (error) {
                rejects(error);
            });
    })
}

async function updateL10n() {
    return new Promise((resolve, rejects) => {
        // L10n 업데이트 하는 구문 작성 필요.
        // 결국 자동화 하려면 L10n 기준으로 동적으로 작성해야함
        axios.get('https://open-api.bser.io/v1/l10n/Korean', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                axios.get(response.data.data.l10Path, {
                params: {},
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    rejects(error);
                });
            })
            .catch(function (error) { 
                rejects(error);
            });
        
    });
}

async function updateTraits(l10n) {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/Trait', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    const data = l10n;
                    let traitData = [];

                    response.data.data.map((trait, p) => {
                        const basicTrait = "Trait/Name/" + trait.code;
                        const index = data.indexOf(basicTrait) + basicTrait.length;
                        const endIndex = data.indexOf("\r", index);

                        const TraitName = data.substring(index + 1, endIndex);

                        // Fortification 파랑, Havoc 빨강, Support 연두 특성

                        if (trait.openAccountLv === 1) {
                            traitData.push({
                                name: TraitName,
                                code: trait.code,
                                traitGroup: trait.traitGroup,
                                traitType: trait.traitType
                            });
                        }
                    });

                    fs.writeFile('parsed/traitList.json', JSON.stringify(traitData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('parsed/traitList updated')
                    });
                }
                resolve();
            }).catch(function (error) {
                rejects(error);
            });
    });
}

async function updateAll() {
    console.log("L10n 불러오는 중..");
    const l10n = await updateL10n();
    console.log("... 완료!");

    await parseArmor(l10n);
    await parseWeapon(l10n);
    fs.writeFile('parsed/itemData.json', JSON.stringify(itemData), 'utf8', function (error) {
        error ? console.log(error) : null;
        console.log('parsed/noitem updated');
    });
    await updateMastery(l10n);
    await updateTraits(l10n);
}

app.listen(SCHEDULE_PORT, () => {
    updateAll();
});
