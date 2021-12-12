class MainServices{

     kol = 0;

    getResource = async () =>{
        let res = await fetch('https://api.thecatapi.com/v1/breeds');
    
        if(!res.ok){
            throw new Error(`Что-то пошло не так`)
        }

        return await res.json()
    }

    getAllCats = async (second = 0, next = 3) => {
    
        let res = await this.getResource();
        return await res.slice(second,next).map(this.transform);
        
    }

    


    transform = (item) =>{
       return{
           id: item.id,
           name: item.name,
           description: item.description,
           temperament: item.temperament,
           url: item.image.url
       }
        
    }
    
    getOneCat = async () => {
    
        let re = await this.getResource();
        return await re.slice(0,29).map(this.transform);
        
    }


}

export default MainServices;