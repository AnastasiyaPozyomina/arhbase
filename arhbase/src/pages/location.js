import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';





import Heading from '@theme/Heading';
import styles from './index.module.css';


export default function Location() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      // title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">

      <main>
        <h1>Томская губерния</h1>
        <h2>Список населённых мест</h2>
        <p>Здесь представлен список населенных мест входивших в Бийский уезд за все время его существования, информацию по которым вы можете найти на сайте.</p>
        <iframe id="iframeId" src="https://yandex.ru/map-widget/v1/?um=constructor%3Aca399784d24b1ae86d0db68af925ba1eeb3edbfc7188f789f4a43fa3e03efb67&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
      </main>
    </Layout>
  );
}




 