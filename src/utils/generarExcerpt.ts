

export const generarExcerpt = (parrafo:string, longitudMaxima:number) => {

    parrafo = parrafo.replace(/[\n\\]/g, '');

    if (parrafo.length <= longitudMaxima) {
        return parrafo; 
    }

   
    let ultimoEspacio = parrafo.lastIndexOf(' ', longitudMaxima);

    
    let excerpt = parrafo.substring(0, ultimoEspacio);

   
    excerpt += '...';

    return excerpt;
}
