const express = require('express'); // express 임포트
const SCHEDULE_PORT = 8010;
const app = express(); // app생성
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0';

// Items
let itemData = [];

async function parseArmor() {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/ItemArmor', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    response.data.data.map((armor, p) => {
                        if(armor.itemGrade === "Epic" || armor.itemGrade === "Legend") {
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

async function parseWeapon() {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/ItemWeapon', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    response.data.data.map((weapon, p) => {
                        if(weapon.itemGrade === "Epic" || weapon.itemGrade === "Legend") {
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

async function updateItem() {
    await parseArmor();
    await parseWeapon();
    fs.writeFile('parsed/itemData.json', JSON.stringify(itemData), 'utf8', function(error){
        console.log(error);
        console.log('item updated')
    });
    await updateMastery();
}

async function updateMastery() {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v2/data/CharacterMastery', {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    let masteryList = [];
                    response.data.data.map((mastery, p) => {
                        masteryList.push({
                            code: mastery.code,
                            weapon1 : mastery.weapon1,
                            weapon2 : mastery.weapon2,
                            weapon3 : mastery.weapon3,
                            weapon4 : mastery.weapon4
                        });
                    });
                    fs.writeFile('parsed/charMastery.json', JSON.stringify(masteryList), 'utf8', function(error){
                        console.log(error);
                        console.log('mastery updated')
                    });
                }
                
                resolve("성공")
            }).catch(function (error) {
                rejects(error);
            });
    })
}

app.listen(SCHEDULE_PORT, () => {
    updateItem()
    //매 n초마다 수행!
    // schedule.scheduleJob('10 41 * * * *', function () { });
}) // 타입스크립트로 전환 해야함
