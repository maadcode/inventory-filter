// Variables
const $marca = document.querySelector('#marca')
const $year = document.querySelector('#year')
const $precioMinimo = document.querySelector('#minimo')
const $precioMaximo = document.querySelector('#maximo')
const $puertas = document.querySelector('#puertas')
const $transmision = document.querySelector('#transmision')
const $color = document.querySelector('#color')

const $resultado = document.querySelector('#resultado')
const $message = document.querySelector('#message')

const maxYear = new Date().getFullYear()
const minYear = maxYear - 10

const datosBusqueda = {
    marca: '',
    year: '',
    precioMinimo: '',
    precioMaximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Listeners

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos) // Mostrar autos al cargar

    llenarSelect() // Llenar select de años
})

$marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value 
    filtrarAutos()
})

$year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value)
    filtrarAutos() 
})

$precioMinimo.addEventListener('change', e => {
    datosBusqueda.precioMinimo = parseInt(e.target.value)
    filtrarAutos() 
})

$precioMaximo.addEventListener('change', e => {
    datosBusqueda.precioMaximo = parseInt(e.target.value)
    filtrarAutos() 
})

$puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarAutos() 
})

$transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value
    filtrarAutos() 
})

$color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value
    filtrarAutos() 
})


// Functions 

function mostrarAutos(autos) {
    limpiarHtml()

    autos.forEach(auto => {
        const {marca, modelo, year, puertas, color, transmision, precio} = auto
         
        const autoHtml = document.createElement('tr')
        autoHtml.innerHTML = `
            <td>${marca} - ${modelo}</td>
            <td>${year}</td>
            <td>${puertas}</td>
            <td>${transmision}</td>
            <td>${precio}</td>
            <td>${color}</td>
        `

        $resultado.appendChild(autoHtml)
    })
}

function limpiarHtml() {
    while($resultado.firstChild) {
        $resultado.removeChild($resultado.firstChild)
    }
}

function llenarSelect() {
    for(let i = maxYear; i >= minYear; i--) {
        const opcion = document.createElement('option')
        opcion.value = i
        opcion.textContent = i
        $year.appendChild(opcion)
    }
}

function filtrarAutos() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMinimo).filter(filtrarPrecioMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    if(resultado.length) {
        mostrarAutos(resultado)
    } else {
        noResultado()
    }
}

function noResultado() {
    limpiarHtml()

    const noResultado = document.createElement('p')
    noResultado.classList.add('alerta', 'error')
    noResultado.textContent = 'No hay resultados'

    $message.appendChild(noResultado)
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda
    if(marca) {
        return auto.marca === marca
    }
    return auto
}

function filtrarYear(auto) {
    const {year} = datosBusqueda
    if(year) {
        return auto.year === year
    }
    return auto
}

function filtrarPrecioMinimo(auto) {
    const {precioMinimo} = datosBusqueda
    if(precioMinimo) {
        return auto.precio >= precioMinimo
    }
    return auto
}

function filtrarPrecioMaximo(auto) {
    const {precioMaximo} = datosBusqueda
    if(precioMaximo) {
        return auto.precio <= precioMaximo
    }
    return auto
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda
    if(puertas) {
        return auto.puertas === puertas
    }
    return auto
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda
    if(transmision) {
        return auto.transmision === transmision
    }
    return auto
}

function filtrarColor(auto) {
    const {color} = datosBusqueda
    if(color) {
        return auto.color === color
    }
    return auto
}