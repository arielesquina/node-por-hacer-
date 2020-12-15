const fs = require('fs');

let listadoPorHAcer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHAcer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHAcer = require('../db/data.json');

    } catch (error) {
        listadoPorHAcer = [];
    }
    //console.log(listadoPorHAcer);
}

const crear = (descripcion) => {
    cargarDB();
    let porHAcer = {
        descripcion,
        completado: false
    };

    listadoPorHAcer.push(porHAcer);
    guardarDB();

    return porHAcer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHAcer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHAcer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHAcer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

let arrayBorrar = (arr, value) => {

}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHAcer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length === listadoPorHAcer.length) {
        return false;
    } else {
        listadoPorHAcer = nuevoListado;
        guardarDB();
        return true;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}