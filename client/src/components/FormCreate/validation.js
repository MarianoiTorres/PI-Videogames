const validation = (input) => {
    const regexName = /^[a-zA-Z0-9\s]+$/
    const regexURL = /\.(jpeg|jpg|gif|png)$/
    
    if(input.description === '') return 'Debe agregar una descripcion al juego'
    else if(!input.description === '') return ''
    
    if(input.background_image === '') return 'Debe agregar una URL de una imagen'
    else if(!input.background_image === '') return ''
    
    if(input.released === '') return 'Debe agregar la fecha de lanzamiento'
    else if(!input.released === '') return ''
    
    if(input.rating < 0 && input.rating > 5) return 'El rating no puede ser menor a 0 o mayor a 5'
    else if(!input.rating < 0 && input.rating > 5) return ''
    

    if(input.platform || input.genre)
    {
        if(input.platform)
        {
            if(input.platform.length === 0)  return 'Debe agregar por lo menos una plataforma';
            else if(input.platform.length !== 0) return ''
        }
        else
        {
            if(input.genre.length === 0)  return 'Debe agregar por lo menos un genero';
            else if(input.genre.length !== 0) return ''
        }    
    }
    
    if(input.name === '') return 'este campo es obligatorio'
    else if(!input.name === '') return ''
    
    if(regexName.test(input.name)) return ''
    else if(!regexName.test(input.name)) return 'El nombre solo puede contener letras, espacios y numeros'
    
}


export default validation