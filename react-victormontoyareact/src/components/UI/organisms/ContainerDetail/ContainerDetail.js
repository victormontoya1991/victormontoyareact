
import { useContext, useState } from 'react'
import { ButtonReturn } from '../../atoms/ButtonReturn/ButtonReturn'
import { ButtonQuantity } from '../../atoms/ButtonQuantity/ButtonQuantity'
import './ContainerDetail.scss'
import { Link } from 'react-router-dom'
import { ButtonLike } from '../../atoms/ButtoLike/ButtonLike'
import { CarContext } from '../../../../context/CarContext'

const ContainerDetail = ({id, name, image, description, price, category, stock}) => {
    // Info Produc
    const{ addCar,isInCar } = useContext (CarContext)
    const [counter, setCounter] = useState (1)
    const handleCar = () => {
        const itemCar = {
            id,
            name,
            stock,
            category,
            image,
            description,
            price,
            counter
        }
        addCar (itemCar)
    }
    const {mycar} = useContext( CarContext );
    // Max Counter
    const maxCounter = mycar.filter(item => item.id === id);
    const regre = function(cont){return cont.counter;}
    const regreCounter = maxCounter.map(regre)
    const stockAc = stock-regreCounter
    return(
        <div className='ContainerProduct' id={id}>
            <section className='HeaderProduct'>
                <article className='MigasProduct'>
                    <Link to={`/`}>Productos</Link> / <Link to={`/category/${category}`}>{category}</Link>
                </article>
                <ButtonReturn />
            </section>
            <section className='PintureProduct'>
                <article className='PintureImg'>
                    <ButtonLike />
                    <img alt="{name}" src={image}/>
                </article>
            </section>
            <section className='ContectsProduct'>
                    <h2 className='TitleProduct'>{name}</h2>
                    <article className='DescriptionProduct'>
                        <h6 className='TitleDProduct'>Descripción:</h6>
                        <p className='Description'>{description}</p>
                    </article>
                    <article className='PreciProduct'>
                        <p>${price}</p>
                    </article>
                    <article className='ItemStock'>
                        {
                            (stockAc<=0)
                                ? <section className='ContaineShot'> chao</section>
                                : <ButtonQuantity 
                                    stockAc = {stockAc}
                                    max = {stock-regreCounter}
                                    setCounter = {setCounter}
                                    counter = {counter}
                                    onAdd={handleCar}
                                    />
                        }
                        {
                            !isInCar(id)
                                ? null
                                : <Link className='ButtonC' to="/car"> Ir Carrito </Link>
                        }
                    </article>
            </section>
        </div>
    )
}

export default ContainerDetail