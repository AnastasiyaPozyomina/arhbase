import Link from '@docusaurus/Link';
import React from 'react';

export default function SettlementHistory() {
  return (
    <div className="container">
      {/* Главный заголовок */}
      <h2 className="center">Важнейшие даты</h2>
      <h3 className="center">История заселения окрестностей Усть-Каменогорской крепости на Иртышской линии</h3>
      
      {/* Список событий */}
      <ul>
        <li><strong>1720 год</strong> – Основание Усть-Каменогорской крепости.</li>
      </ul>

      <ul>
        <li>
          <strong>1748 год</strong>:
          <ul>
            <li>
             <Link to="/blog/first-village">Основана деревня Убинская. Начали строить первые избы.</Link>
            </li>
            <li>
             <Link to="/blog/first-village">
                В урочище Прапорщикова начали строить первые избы. Основана деревня Прапорщикова.
              </Link>
            </li>
          </ul>
        </li>
        <li><strong>1760 год</strong> – <Link to="/blog/glubokaya">–Деревня Глубокая.</Link></li>
        <li><strong>1761 год</strong> <Link to="/docs/revision-tales/fourth-revision/krutaya-berezovka">
        – Деревня Крутая Березовка.</Link></li>
        <li><strong>1762 год</strong> – Деревня Зевакина (она же Старица).</li>
        <li>
          <strong>1763 год</strong>:
          <ul>
            <li>Деревня Бобровская.</li>
            <li>
              <Link to="/blog/osnovanie-derevni-vidrihi">Основана деревня Выдринская.</Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul>
        <li>
          <strong>1761–1762 года</strong>:
          <ul>
            <li>
              <Link to="/docs/revision-tales/fourth-revision/krasnoyarskaya-na-irtyshe1782">
                Деревня Красноярская на Иртыше заведена и заселена великороссийскими посельщиками.
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <strong>1763 год</strong>:
          <ul>
            <li>После 1763 года – Деревня Красноярская на Убе.</li>
          </ul>
        </li>
        <li><strong>1765 год</strong> – Деревня Большерецкая, деревня Новоалейская.</li>
        <li>
          <strong>1766 год</strong>:
          <ul>
            <li>
              <Link to ="/docs/revision-tales/fourth-revision/verh-ubinskaya1782">
                Деревня Верх-Убинская.
              </Link>
            </li>
            <li>
              <Link to="/docs/revision-tales/fourth-revision/sekisovskaya1782">
                Деревня Секисовская.
              </Link>
            </li>
            <li>
             <Link to="/docs/revision-tales/fourth-revision/ekaterinskaya1782">
                Деревня Екатерининская.
              </Link>
            </li>
            <li>
              <Link to="/docs/revision-tales/fourth-revision/staroaleiskaya1782">
                Деревня Староалейская.
              </Link>
            </li>
            <li>
              <Link to="/docs/revision-tales/fourth-revision/shemanaevskaya1782">
                Деревня Шемонаевская.
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul>
        <li>
          <strong>1771 год</strong>:
          <ul>
            <li>
              <Link to="/blog/na-kazhdogo-potrebno-porohu-i-svincu">
                Генерал-майор Сергей Кирилович Станиславский приказал раздать порох и свинец крестьянам деревень
                Прапорщиковой, Глубокой, Зевакиной, Убинской, Выдринской, Большерецкой, Бобровской.
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <strong>1776 год</strong>:
          <ul>
            <li>
              <Link to="/blog/derevnia-kabanova">
                Основана деревня Кабанова.
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <strong>1783 год</strong>:
          <ul>
            <li>
              <Link to="/docs/revision-tales/fourth-revision/krasnoyarskaya-na-ube1782#urochishche-na-rechke-vavilovke">
                Основана деревня Вавилонская.
              </Link>
            </li>
          </ul>
        </li>
        <li><strong>1786 год</strong> – <Link to="/docs/revision-tales/fifth-revision/steklyanskaya1795">Деревня Стеклянская.</Link></li>

        <li><strong>25 июня 1792 год</strong>  -<Link to="/blog/beglym-rossiyskim-lyudyam">Беглым российским людям, укрывающимся в бухтарминских горах объявление о помиловании и присвоение статуса ясашных бухтарминским каменщикам.</Link> </li>
        <li><strong>не позднее 1787 года </strong> –  <Link to="/blog/osnovanie-derevni-malaya-ubinka">
                Основана деревня Малая Убинская.
              </Link>
        </li>
        <li><strong>1801 год </strong> – Деревня Быструха</li>
        <li><strong>1801 год </strong> – Деревня Новая Шульба</li>
        <li><strong>1801 год </strong> – Деревня Жерновская </li>
        <li><strong>с 1820 года</strong> – Деревня Тарханская</li>
        <li><strong>1832 год </strong> – Деревня Бородулихинская. Учреждена по постановлению Горного Правления 31 декабря 1831 года, с 1832 года.</li>
       <li><strong>с 1834 года </strong> – Деревня Поперешная</li>
      </ul>
    </div>
  );
}