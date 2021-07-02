// import React from 'react'

export default function makeid(lenght) {
    let result;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLenght = characters.length;
    for (let i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLenght));
    }

    return result;
}
