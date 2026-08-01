import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';



const FeatureList = [
  {
    title: 'Ревизские сказки',
    img:"/img/revisiya.webp",
    alt:'ревизская сказка деревни Выдринской 1763 год',
    description: (
      <>
<ul className="feature-list">
<li className="list-item"><Link to='/docs/revision-tales/second-revision'>Верх-Иртышских крепостей 1747 год </Link></li> 
<li className="list-item"><Link to='/docs/category/iii--ведомство-усть-каменогорской-крепости'>Верх-Иртышской крепости Усть-Каменогорского ведомства 1763 г </Link></li> 
<li className="list-item"><Link to='/docs/category/iv-бобровская-слобода'>Бобровской слободы Барнаульского уезда Колыванской области 1782 года </Link></li>
<li className="list-item"><Link to='/docs/category/vi-убинская-волость'>Убинской волости Бийского уезда Томской губернии 1812 года</Link></li>
<li className="list-item"><Link to='/docs/category/vii-бухтарминская-волость'>Бухтарминской волости Бийского уезда Томской губернии 1816 года</Link></li>
<li className="list-item"><Link to='/docs/category/viii-крутоберезовская-волость'>Крутоберезовской волости Бийского уезда Томской губернии 1834 года</Link></li>
</ul>
       

      </>
    ),
  },
  {
    title: 'Поселенцы ',
    img:"/img/poselensy.webp",
    alt:'прощание перед переселением',
    description: (
      <> <a href='/docs/category/поселенцы--в-усть-каменорское-ведомство-1748-году'>Документы о переселении пашенных крестьян и разночинцев в Верх-Иртышскую крепость Усть-Каменогорского ведомства в 1748 году</a>
      </>
    ),
  },
  {
    title: 'Русская Православная Церковь (РПЦ)',
    img:"/img/church.webp",
    alt:'церковь',
    description: (
      <>
      <a href='/docs/category/русская-православная-церковь'>Церковные  дела по приходам: ведомости церквей,  исповедные росписи,  метрические книги</a>
      </>
    ),
  },
  {
    title: 'Единоверие',
    description: (
      <>
      <ul className="feature-list">
<li className="list-item"><Link to='/docs/category/с-секисовское-единоверческая-богородице-рождественская-церковь'>с. Секисовское Единоверческая Богородице-Рождественская церковь </Link></li>
<li className="list-item"><Link to='/docs/category/с-шемонаевское--единоверческая-преображенская-церковь'>с. Шемонаевское Единоверческая Преображенская церковь </Link></li>
<li className="list-item"><Link to='/docs/category/с-кондратьевское-единоверческая-покровская-церковь'>с. Кондратьевское Единоверческая Покровская церковь </Link></li>
<li className="list-item"><Link to='/docs/category/с-выдрихинское-единоверческая-богородице-рождественская-церковь'>с. Выдрихинское Единоверческая Богородице-Рождественская церковь </Link></li>
<li className="list-item">с. Бобровское Единоверческая Успенская церковь </li>
<li className="list-item">с. Большереченское Единоверческая Спасская  церковь </li>
<li className="list-item"><Link to='/docs/category/с-орловское-единоверческая-богородице-владимирская-церковь'>с. Орловское Единоверческая Богородице-Владимирская церковь</Link></li>
<li className="list-item">с. Мало-Убинское Единоверческая Покровская  церковь </li>



</ul>
      </>
    ),
  },
   {
    title: 'Белокриницкая иерархия или Австрийское согласие',
    description: (
      <>
      <ul className="feature-list">
<li> 20 июня 1907 № 295 Быструхинская Владимирской волости</li> 
<li>5 сент. 1907 г. № 409 Ново-Шульбинская Ново-Шульбинской волости</li>
<li><Link to='/docs/staroobryadtsy/poperechenskaya-staroobryadcheskaya-obshchina'>28 нояб. 1907 г. № 484 Поперечная Риддерской волости</Link></li>
<li className="list-item">12 дек. 1907 г. № 518 Александровская Владимирской волости</li> 
<li><Link to='/docs/staroobryadtsy/staroobryadcheskaya-obshchina-bolshaya-rechka'>12 дек. 1907 г. № 520 Большереченская Владимирской волости </Link></li>
<li>16 мая 1908 г. № 190 Староалейская Алейской волости</li>
<li><Link to='/docs/staroobryadtsy/staroobryadcheskaya-obshchina-vydrikha'>28 мая 1908 г. № 484 Выдрихинская Александровской волости</Link></li>
<li className="list-item"><Link to='/docs/staroobryadtsy/obshchina-v-bogatyrevo'>4 сент. 1909 г. № 211 Богатыревская, Зыряновской волости</Link></li>
<li><Link to='/docs/staroobryadtsy/sekisovskaya-obchina'>4 декабря 1909 г. № 266 Секисовская Владимирской волости</Link></li>

</ul>

      </>
    ),
  },
   {
  title: 'Старообрядческие общины разных согласий',
  description: (
    <>
      <ul className="feature-list">
        <li className="list-item"  style={{ listStyleType: 'none' }}><em>Соловецкого согласия:</em></li>
        <li className="list-item"><Link to='/docs/staroobryadtsy/obshchina-verkh-myakonka'>4 июля 1908 г. № 280 Верх-Мяконьковская, Зыряновской волости</Link></li>
        <li className="list-item"><Link to='/docs/staroobryadtsy/prigovor'>8 мая 1909 г. № 119 и 29 янв. 1916 г. № 2 Беловская, Верх-Бухтарминской волости</Link></li>

        <li className="list-item"><Link to='/docs/staroobryadtsy/solovyevskaya-obshchina'>8 мая 1909 г. № 117 Соловьевская, Зыряновской волости</Link></li>
        <li className="list-item">4 сент. 1909 г. № 211 и 7 нояб 1914 г. № 1270 Богатыревская, Зыряновской волости</li>
        <li className="list-item"><Link to='/docs/staroobryadtsy/sennovskaya-obshchina'>30 окт. 1909 г. № 237 Сенновская, Верх-Бухтарминской волости</Link></li>
        <li className="list-item"><Link to='/docs/staroobryadtsy/obshchina-chernovinskoye'> 7 мая 1910 г. № 131 Черновинская, Черновинской волости</Link></li>

        <li className="list-item">23 июля 1910 г. № 257 Тургусунская, Бухтарминской волости</li>
        <li className="list-item"  style={{ listStyleType: 'none' }}><em>Поморского законобрачного согласия:</em></li>
        <li className="list-item"><Link to='/docs/staroobryadtsy/vverh-uba'>7 февр. 1907 г. № 90 Верх-Убинская, Владимирской волости</Link></li>
        <li className="list-item"> 10 мая 1910 г. № 146 Чистопольская, Бухтарминской волости</li>
        <li className="list-item"  style={{ listStyleType: 'none' }}><em>Каллистратовского толка, последователей Павла Коломенского:</em></li>
        <li className="list-item"><Link to='/docs/staroobryadtsy/zevakino-obshina'>15 нояб. 1908 г. № 430 Зевакинская, Усть-Каменогорской волости</Link></li>

        <li className="list-item"  style={{ listStyleType: 'none' }}><em>Спасова согласия:</em></li>
        <li className="list-item">29 февр. 1908 г. № 64 Согорная, Черновинской волости</li>
        <li className="list-item"> </li>
        <li className="list-item">16 ноября 1912 г. № 1010 Бурановская, Николаевской волости</li>
      </ul>
    </>
  ),
},
  
];

function Feature({img ,title, description, alt}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      <img className="image-feature" src={img} alt={alt}  width="300" height="auto" />
      </div> 
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}


