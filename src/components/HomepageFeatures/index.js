import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Seamless Integration',
    Svg: require('@site/static/img/icon_1.svg').default,
    description: (
      <>
        Fire Pagamentos API provides an effortless setup, designed for easy integration with your systems.
        Jumpstart your payment handling in no time.
      </>
    ),
  },
  {
    title: 'Reliable Transactions',
    Svg: require('@site/static/img/icon_2.svg').default,
    description: (
      <>
        With Fire Pagamentos API, experience reliable and secure transactions.
        We ensure that each payment processed is handled with utmost integrity.
      </>
    ),
  },
  {
    title: 'Customer Support',
    Svg: require('@site/static/img/icon_3.svg').default,
    description: (
      <>
        Got questions or issues? Reach us at <a href="mailto:contact@firepagamentos.com.br">contact@firepagamentos.com.br</a>. Our team is always ready to assist you.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
  );
}
