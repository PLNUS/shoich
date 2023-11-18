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
                            const basicItem = "Item/Name/" + armor.code;
                            const itemIndex = l10n.indexOf(basicItem) + basicItem.length;
                            const endItemIndex = l10n.indexOf("\r", itemIndex);

                            itemData.push({
                                name: l10n.substring(itemIndex + 1, endItemIndex),
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
                            const basicItem = "Item/Name/" + weapon.code;
                            const itemIndex = l10n.indexOf(basicItem) + basicItem.length;
                            const endItemIndex = l10n.indexOf("\r", itemIndex);

                            itemData.push({
                                name: l10n.substring(itemIndex + 1, endItemIndex),
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
                    let tacticalSkillData = [];
                    let skillDescData = [];
                    response.data.data.map((mastery, p) => {
                        const basicSkillQ = "Skill/Group/Desc/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "400" : "200");
                        const skillIndexQ = l10n.indexOf(basicSkillQ) + basicSkillQ.length;
                        const endSkillIndexQ = l10n.indexOf("\r", skillIndexQ);

                        const basicSkillQName = "Skill/Group/Name/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "400" : "200");
                        const skillIndexQName = l10n.indexOf(basicSkillQName) + basicSkillQName.length;
                        const endSkillIndexQName = l10n.indexOf("\r", skillIndexQName);

                        const basicSkillW = "Skill/Group/Desc/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "500" : "300");
                        const skillIndexW = l10n.indexOf(basicSkillW) + basicSkillW.length;
                        const endSkillIndexW = l10n.indexOf("\r", skillIndexW);

                        const basicSkillWName = "Skill/Group/Name/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "500" : "300");
                        const skillIndexWName = l10n.indexOf(basicSkillWName) + basicSkillWName.length;
                        const endSkillIndexWName = l10n.indexOf("\r", skillIndexWName);

                        const basicSkillE = "Skill/Group/Desc/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "600" : "400");
                        const skillIndexE = l10n.indexOf(basicSkillE) + basicSkillE.length;
                        const endSkillIndexE = l10n.indexOf("\r", skillIndexE);

                        const basicSkillEName = "Skill/Group/Name/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "600" : "400");
                        const skillIndexEName = l10n.indexOf(basicSkillEName) + basicSkillEName.length;
                        const endSkillIndexEName = l10n.indexOf("\r", skillIndexEName);

                        const basicSkillR = "Skill/Group/Desc/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "700" : "500");
                        const skillIndexR = l10n.indexOf(basicSkillR) + basicSkillR.length;
                        const endSkillIndexR = l10n.indexOf("\r", skillIndexR);

                        const basicSkillRName = "Skill/Group/Name/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + (mastery.code === 48 ? "700" : "500");
                        const skillIndexRName = l10n.indexOf(basicSkillRName) + basicSkillRName.length;
                        const endSkillIndexRName = l10n.indexOf("\r", skillIndexRName);

                        const basicSkillT = "Skill/Group/Desc/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + "100";
                        const skillIndexT = l10n.indexOf(basicSkillT) + basicSkillT.length;
                        const endSkillIndexT = l10n.indexOf("\r", skillIndexT);

                        const basicSkillTName = "Skill/Group/Name/10" + (mastery.code < 10 ? "0" + mastery.code : mastery.code) + "100";
                        const skillIndexTName = l10n.indexOf(basicSkillTName) + basicSkillTName.length;
                        const endSkillIndexTName = l10n.indexOf("\r", skillIndexTName);

                        let descQ = skillIndexQ < 50 ? "null" : l10n.substring(skillIndexQ + 1, endSkillIndexQ).replaceAll("\\n", "\n");
                        let descW = skillIndexW < 50 ? "null" : l10n.substring(skillIndexW + 1, endSkillIndexW).replaceAll("\\n", "\n");
                        let descE = skillIndexE < 50 ? "null" : l10n.substring(skillIndexE + 1, endSkillIndexE).replaceAll("\\n", "\n");
                        let descR = skillIndexR < 50 ? "null" : l10n.substring(skillIndexR + 1, endSkillIndexR).replaceAll("\\n", "\n");
                        let descT = skillIndexT < 50 ? "null" : l10n.substring(skillIndexT + 1, endSkillIndexT).replaceAll("\\n", "\n");

                        const reg = new RegExp(/{[0-9]+}/);
                        const regTag = new RegExp(/\<(.*?)>/gi);

                        while (regTag.test(descQ)) {
                            descQ = descQ.replace(regTag, "");
                        }
                        while (reg.test(descQ)) {
                            descQ = descQ.replace(reg, "(?)");
                        }

                        while (regTag.test(descW)) {
                            descW = descW.replace(regTag, "");
                        }
                        while (reg.test(descW)) {
                            descW = descW.replace(reg, "(?)");
                        }

                        while (regTag.test(descE)) {
                            descE = descE.replace(regTag, "");
                        }
                        while (reg.test(descE)) {
                            descE = descE.replace(reg, "(?)");
                        }

                        while (regTag.test(descR)) {
                            descR = descR.replace(regTag, "");
                        }
                        while (reg.test(descR)) {
                            descR = descR.replace(reg, "(?)");
                        }

                        while (regTag.test(descT)) {
                            descT = descT.replace(regTag, "");
                        }
                        while (reg.test(descT)) {
                            descT = descT.replace(reg, "(?)");
                        }

                        const nameQ = skillIndexQ < 50 ? "null" : l10n.substring(skillIndexQName + 1, endSkillIndexQName);
                        const nameW = skillIndexW < 50 ? "null" : l10n.substring(skillIndexWName + 1, endSkillIndexWName);
                        const nameE = skillIndexE < 50 ? "null" : l10n.substring(skillIndexEName + 1, endSkillIndexEName);
                        const nameR = skillIndexR < 50 ? "null" : l10n.substring(skillIndexRName + 1, endSkillIndexRName);
                        const nameT = skillIndexT < 50 ? "null" : l10n.substring(skillIndexTName + 1, endSkillIndexTName);

                        skillDescData.push({
                            code: mastery.code,
                            nameQ: nameQ,
                            nameW: nameW,
                            nameE: nameE,
                            nameR: nameR,
                            nameT: nameT,
                            descQ: descQ,
                            descW: descW,
                            descE: descE,
                            descR: descR,
                            descT: descT
                        });

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
                        tacticalSkillData.push({
                            code: mastery.code,
                            data: SynAndItemPiece.data
                        });
                    });
                    fs.writeFile('base/charData.json', JSON.stringify(charData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/charData ... 완료!')
                    });
                    fs.writeFile('base/synergyData.json', JSON.stringify(synData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/synergyData ... 완료!')
                    });
                    fs.writeFile('base/itemData.json', JSON.stringify(itemData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/itemData ... 완료!')
                    });
                    fs.writeFile('base/traitData.json', JSON.stringify(traitData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/traitData ... 완료!')
                    });
                    fs.writeFile('parsed/charMastery.json', JSON.stringify(masteryList), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('parsed/mastery ... 완료!')
                    });
                    fs.writeFile('parsed/skillDesc.json', JSON.stringify(skillDescData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('parsed/skillDesc ... 완료!')
                    });
                    fs.writeFile('base/tacticalSkillData.json', JSON.stringify(tacticalSkillData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('base/tacticalSkillData ... 완료!')
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

                        const basicTraitDesc = "Trait/Tooltip/" + trait.code;
                        const indexDesc = data.indexOf(basicTraitDesc) + basicTraitDesc.length;
                        const endIndexDesc = data.indexOf("\r", indexDesc);

                        const TraitDesc = data.substring(indexDesc + 1, endIndexDesc).replaceAll("\\n", "\n");

                        // Fortification 파랑, Havoc 빨강, Support 연두 특성

                        if (trait.openAccountLv === 1) {
                            traitData.push({
                                name: TraitName,
                                code: trait.code,
                                desc: TraitDesc,
                                traitGroup: trait.traitGroup,
                                traitType: trait.traitType
                            });
                        }
                    });

                    fs.writeFile('parsed/traitList.json', JSON.stringify(traitData), 'utf8', function (error) {
                        error ? console.log(error) : null;
                        console.log('parsed/traitList ... 완료!')
                    });
                }
                resolve();
            }).catch(function (error) {
                rejects(error);
            });
    });
}

async function updateTacticalSkills(l10n) {
    let tacticalSkillData = [];

    axios.get("https://open-api.bser.io/v2/data/TacticalSkillSetGroup", {
        params: {},
        headers: { 'x-api-key': API_KEY }
    })
        .then(function (response) {
            if (response.data.code === 200) {
                const tsData = response.data.data;
                tsData.map((ts, p) => {
                    if (ts.modeType === 7) { // 근발트 제거
                        const TSCode = parseInt(ts.icon.substring(11, 18));

                        const basicTS = "Skill/Group/Name/" + TSCode;
                        const TSIndex = l10n.indexOf(basicTS) + basicTS.length;
                        const endTSIndex = l10n.indexOf("\r", TSIndex);

                        // 툴팁 추가 구현 필요

                        const tsName1 = l10n.substring(TSIndex + 1, endTSIndex);

                        tacticalSkillData.push({
                            name: tsName1,
                            group: ts.group
                        });
                    }
                });

                fs.writeFile('parsed/tacticalSkillData.json', JSON.stringify(tacticalSkillData), 'utf8', function (error) {
                    error ? console.log(error) : null;
                    console.log('parsed/tacticalSkillData ... 완료!');
                });
            }
        })
        .catch(function (error) {
            console.log(error);
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
        console.log('parsed/itemData ... 완료!');
    });
    await updateMastery(l10n);
    await updateTraits(l10n);
    await updateTacticalSkills(l10n);
}

app.listen(SCHEDULE_PORT, () => {
    updateAll();
});
