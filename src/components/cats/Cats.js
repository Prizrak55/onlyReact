import './cats.css';
import {
    useEffect,
    useState
} from 'react';
import MainServices from '../../services/MainServices';


const Cats = (props) => {

        const [s, sS] = useState(3);
        const [n, sN] = useState(6);

        const [catsIMG, setCatsIMG] = useState('');
        const [catsData, setCatsData] = useState([]);

        const [countCats, setCountCats] = useState('');


        const [catsFavoritesDatalast, setCatsFavoritesDatalast] = useState([])
        const [oneCat, setOneCat] = useState('');

        const mainService = new MainServices();



    //получение всех кошек
    const getCats = async () => {
        const allCats = await mainService.getAllCats()
        dataSet(allCats)
    }
    
    // получение следующих 3 кошек
   const nexImages = async () => {
       sS(n)
       sN(n + 3)
       return await mainService.getAllCats(s, n).then(dataSet);
       //  setCatsIMG([...catsIMG,...newcats]);
   }

    //добавление всех кошек 
    const dataSet = (allCats) => {
        setCatsData([...catsData, ...allCats])
    }

    //удаление кошечки
    const deleteCatt = (e) => {
        setCatsData(catsData.filter(i => i.id !== e.target.getAttribute('indexkey')))
    }


   useEffect(() => {
       getCats();
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
       catsNeed(catsData)
       setCountCats(catsData.length)
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [catsData])

 

   const catsNeed = (item) =>{
     const catslist = item.map((item)=> 
                            <div key={item.id} className="centerImg">
                                <img className="cats-img" src={item.url} indexkey={item.id} onClick={(e)=>atribut(e)} alt="123" />
                                <p></p>
                                <button indexkey={item.id} onClick={(e)=>deleteCatt(e)}>удалить</button>
                                <button indexkey={item.id} onClick={(e)=>setFavoriteCats(e)}>Добавить в избранное</button>
                                <button indexkey={item.id}  onClick={(e)=>deletesetFavoriteCats(e)}>Удалить из избранного</button>
                                <p>{item.name}</p>
                            </div> 
                        )
    
   setCatsIMG(catslist)
   };



   //получение атрибута одной кошки и рендеринг
   const atribut =  (e) => {
       //https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg
       const item = catsData.find(i => i.id === e.target.getAttribute('indexkey'));
       setOneCat(item);
   }

   // поиск, нет разницы какой регистр букв
   const inputSerch = (e) =>{
    if(e.target.value === '') {
        catsNeed(catsData);
        setCountCats(catsData.length)
    }
    else{
       const b = catsData.filter(item=>item.name.toLowerCase().indexOf(e.target.value.toLowerCase())>-1)
       catsNeed(b)
       setCountCats(b.length)
    }
   }


   function setFavoriteCats(e) {
    setCatsFavoritesDatalast(item=>[...item,...catsData.filter(item => item.id === e.target.getAttribute('indexkey'))])
   }

  

   function deletesetFavoriteCats(e) {
    setCatsFavoritesDatalast(item=>item.filter(item => item.id !== e.target.getAttribute('indexkey')))
   }

   useEffect(()=>{
    props.setFavoriteCats(catsFavoritesDatalast)
   },[catsFavoritesDatalast])


    return( 
        <>
            
            <div className="flex-img">
                <h3>Всего кошек: {countCats}</h3>
            </div>
            <div >
                <input className="serchInput" type="text" placeholder='поиск кошек' onChange={(e)=>inputSerch(e)} />
            </div>
            <section className="main-page-cats">
                    
                    <div className="flex-img">
                        {catsIMG}
                     </div>


                    
                     <div className='wit'>
                        <div>
                            <img className='centerimg' src={oneCat.url} alt="123" />
                        </div>
                        <div>
                            <h2 className="h-center">О кошке</h2>
                            <h3>                                                                        
                               {oneCat.name}
                            </h3>
                            <p>
                            {oneCat.description}
                            </p>   
                            <p>
                            <strong>Темперамент:</strong> {oneCat.temperament}
                            </p>
                        </div>
                     </div>
            </section>

            <div className="flex-img">
                <button onClick={nexImages}> СЛЕД </button>
            </div>
        </>
    )
}

export default Cats;