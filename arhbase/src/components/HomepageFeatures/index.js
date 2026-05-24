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
<li> <Link to='/docs/category/iii--ведомство-усть-каменогорской-крепости'>Верх-Иртышской крепости Усть-Каменогорского ведомства 1762-1763 г </Link></li> 
<li><Link to='/docs/category/iv-бобровская-слобода'>Бобровской слободы Барнаульского уезда Колыванской области 1782 года </Link></li>
<li><Link to='/docs/category/vi-убинская-волость'>Убинской волости Бийского уезда Томской губернии 1812 года</Link></li>
<li><Link to='/docs/category/vii-бухтарминская-волость'>Бухтарминской волости Бийского уезда Томской губернии 1816 года</Link></li>
<li><Link to='/docs/category/viii-крутоберезовская-волость'>Крутоберезовской волости Бийского уезда Томской губернии 1834 года</Link></li>
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
    title: 'Метрические книги',
    img:"/img/church.webp",
    alt:'церковь',
    description: (
      <>
      
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
