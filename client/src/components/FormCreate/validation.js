const validation = (input) => {
    const regexName = /^[a-zA-Z0-9\s]+$/
    const regexURL = /\.(jpeg|jpg|gif|png)$/
    
    if(input.description === '') return 'Description is required'
    else if(!input.description === '') return ''
    
    if(input.background_image === '') return 'URL is required'
    else if(!input.background_image === '') return ''
    
    if(input.released === '') return 'Released is required'
    else if(!input.released === '') return ''
    
    if(input.rating < 0 && input.rating > 5) return 'The rating must be between 0 and 5'
    else if(!input.rating < 0 && input.rating > 5) return ''
    

    if(input.platform || input.genre)
    {
        if(input.platform)
        {
            if(input.platform.length === 0)  return 'At least one platform';
            else if(input.platform.length !== 0) return ''
        }
        else
        {
            if(input.genre.length === 0)  return 'At least one genre';
            else if(input.genre.length !== 0) return ''
        }    
    }
    
    if(input.name === '') return 'Name is required'
    else if(!input.name === '') return ''
    
    if(regexName.test(input.name)) return ''
    else if(!regexName.test(input.name)) return 'Only letters and numbers'
    
}


export default validation