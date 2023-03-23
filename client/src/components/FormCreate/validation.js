const validation = (input) => {
    const regexName = /^[a-zA-Z0-9\s]+$/
    const regexURL = /\.(jpeg|jpg|gif|png)$/
    
    // valido que la descripcion no este vacia
    if(input.description === '') return 'Description is required'
    else if(!input.description === '') return ''
    // valido que haya una url
    if(input.background_image === '') return 'URL is required'
    else if(!input.background_image === '') return ''
    // valido que la fecha de lanzamiento no este vacia
    if(input.released === '') return 'Released is required'
    else if(!input.released === '') return ''
    // valido que el rating este entre 0 y 5
    if(input.rating < 0 && input.rating > 5) return 'The rating must be between 0 and 5'
    else if(!input.rating < 0 && input.rating > 5) return ''
    
    // valido las plataformas o generos
    if(input.platform || input.genre)
    {
        if(input.platform)
        {   
            // que haya por lo menos una plataforma
            if(input.platform.length === 0)  return 'At least one platform';
            else if(input.platform.length !== 0) return ''
        }
        else
        {
            // que haya por lo menos un genero
            if(input.genre.length === 0)  return 'At least one genre';
            else if(input.genre.length !== 0) return ''
        }    
    }
    // valido que el nombre no este vacio
    if(input.name === '') return 'Name is required'
    else if(!input.name === '') return ''
    // valido que el nombre solo pueda tener letras y numeros
    if(regexName.test(input.name)) return ''
    else if(!regexName.test(input.name)) return 'Only letters and numbers'
    
}


export default validation