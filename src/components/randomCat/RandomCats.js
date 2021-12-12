import {NavLink} from 'react-router-dom';

import {useState, useEffect} from 'react';

import './randomcats.css';

import MainServices from '../../services/MainServices';

// первый блок, с рандомной кошкой
const RandomCats = () => {
    
    const [src, setChar] = useState('');
    const [desc, setDesc] = useState('');
    const [name, setName] = useState('');
    const [temperament, setTemperament] = useState('');
    
    const mainService = new MainServices();
 


    
    useEffect(() => {
        getResource();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cons = (item) =>{
        let id = Math.floor(Math.random() * (67 - 1)) + 1;
        setChar(item[id].image.url);
        setDesc(item[id].description);
        setName(item[id].name);
        setTemperament(item[id].temperament);
    }

    const getResource = () =>{
        mainService.getResource().then(cons)
    }


   

    return (
        
        <>
        <header>
            <h1>
                Коллекция котов и кошек
            </h1>
        </header>
                    
        <section className="random-section">
                <div className="addflex">
                    <div className="random-cat">
                        <img src={src} alt="123" />
                    </div>
                    <div className="random-cat">
                        <h2 className="h-center">О кошке</h2>
                        <h3>
                            Порода: {name}
                        </h3>
                        <p>
                        {desc}
                        </p>   
                        <p>
                            Темперамент: {temperament}
                        </p>
                    </div>   
                </div>


            <div className="button-center">
            <button onClick={getResource}>
                Случайная кошка
            </button>
            
            <ul>
                <li><NavLink exact="true" to="/">Все кошки</NavLink></li>
                /
                <li><NavLink exact="true" to="/favorites">Избранные кошки</NavLink></li>
            </ul>
            
            </div>
        </section>
        </>
    )
}

export default RandomCats;