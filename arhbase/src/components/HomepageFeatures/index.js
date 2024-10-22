import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'Ревизские сказки',
    img:"/img/revisiya.png",
    description: (
      <>
<ul>
<li class="list-item"> <a href='/docs/revision-tales/third-revision'>Верхиртышской крепости Усть-Каменогорского ведомства 1762-1763  годы </a></li> 
<li><a href='/docs/category/бобровская-слобода-iv-ревизские-сказки'>Бобровской слободы Барнаульского уезда Колыванской области 1782 года </a></li>
<li><a href='/docs/category/убинская-волость-vi-ревизские-сказки'>Убинской волости Бийского уезда Томской губернии 1816 года</a></li>
</ul>
       

      </>
    ),
  },
  {
    title: 'Поселенцы ',
    img:"/img/poselensy.png",
    description: (
      <> <a href='/docs/category/поселенцы-1747---1748-гг'>Документы о переселении пашенных крестьян и разночинцев в Верх-Иртышскую крепость Усть-Каменогорского ведомства в 1747 году</a>
      </>
    ),
  },
  {
    title: 'Метрические книги',
    img:"/img/church.png",
    description: (
      <>
      
      </>
    ),
  },
];

function Feature({img ,title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      <img className="image-feature" src={img} />
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
