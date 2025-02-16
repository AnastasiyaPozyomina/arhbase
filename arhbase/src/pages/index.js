import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import imgSrc from './starinnye-knigi.webp';


import Heading from '@theme/Heading';
import styles from './index.module.css';





function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div class="containerBox">
    <div class="text-box">
    <h1></h1>
    </div>
    <img
        className="headerImage"
        src={imgSrc}
        alt="Старинные книги"
        
      />
</div>
    
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout  title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
