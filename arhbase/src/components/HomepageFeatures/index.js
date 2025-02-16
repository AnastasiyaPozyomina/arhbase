import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'Ревизские сказки',
    img:"/img/revisiya.webp",
    alt:'ревизская сказка деревни Выдринской 1763 год',
    description: (
      <>
<ul className="feature-list">
<li className="list-item"> <a href='/docs/revision-tales/third-revision'>Верх-Иртышской крепости Усть-Каменогорского ведомства 1763  года </a></li> 
<li><a href='/docs/category/iv-бобровская-слобода'>Бобровской слободы Барнаульского уезда Колыванской области 1782 года </a></li>
<li><a href='/docs/category/vi-убинская-волость'>Убинской волости Бийского уезда Томской губернии 1812 года</a></li>
</ul>
       

      </>
    ),
  },
  {
    title: 'Поселенцы ',
    img:"/img/poselensy.webp",
    alt:'прощание перед переселением',
    description: (
      <> <a href='/docs/category/поселенцы--в-усть-каменорское-ведомство-1748-году'>Документы о переселении пашенных крестьян и разночинцев в Верх-Иртышскую крепость Усть-Каменогорского ведомства в 1747 году</a>
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
      <img className="image-feature" src={img} alt={alt} />
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
