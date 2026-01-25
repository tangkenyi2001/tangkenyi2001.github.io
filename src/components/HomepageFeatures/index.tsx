import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [

  {
    title: 'About Me',
    Svg: () => (
      <div style={{ borderRadius: '50%', padding: 30, display: 'inline-block' }}>
        <img src={require('@site/static/img/kenprofile.jpg').default} alt="Ken Profile" style={{ borderRadius: '50%', width: 148, height: 148, objectFit: 'cover' }} />
      </div>
    ),
    description: (
      <>
        <span>
          Hi, I’m Ken Yi, a Computer Engineering undergraduate at Nanyang Technological University with a strong interest in all things tech, from software systems to emerging technologies.
        </span>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginTop: '16px' }}>
          <a href="/TANG_KEN_%20YI_Resume.pdf" title="Resume" target="_blank" rel="noopener noreferrer">
            <img className="icon-bg-auto" src="/img/reshot-icon-resume-L4CTDEMPY6.svg" alt="Resume" style={{ width: 32, height: 32, borderRadius: 8, padding: 4, transition: 'background 0.2s' }} />
          </a>
          <a href="https://www.linkedin.com/in/tang-ken-yi-05629421a/" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <img className="icon-bg-auto" src="/img/linkedin-svgrepo-com.svg" alt="LinkedIn" style={{ width: 32, height: 32, borderRadius: 8, padding: 4, transition: 'background 0.2s' }} />
          </a>
          <a href="https://github.com/tangkenyi2001" title="GitHub" target="_blank" rel="noopener noreferrer">
            <img className="icon-bg-auto" src="/img/github-142-svgrepo-com.svg" alt="GitHub" style={{ width: 32, height: 32, borderRadius: 8, padding: 4, transition: 'background 0.2s' }} />
          </a>
        </div>
        <style>{`
          .icon-bg-auto { background: transparent; }
          @media (prefers-color-scheme: dark) {
            .icon-bg-auto { background: #fff; }
          }
        `}</style>
      </>
    ),
  },
  {
    title: 'Continuous Improvement',
    Svg: () => (
      <div style={{ background: '#fff', borderRadius: '50%', padding: 30, display: 'inline-block' }}>
        <img src="/img/performance-increase-svgrepo-com.svg" alt="Continuous Improvement" style={{ width: 148, height: 148, objectFit: 'cover', display: 'block' }} />
      </div>
    ),
    description: (
      <>
        This is a space where I document my studies, reflect on what I’ve learned, and continuously refine both my understanding and the systems I build. All blogs will be written without AI.
      </>
    ),
  },
  {
    title: 'AI & Software Engineering',
    Svg: () => (
      
      <div style={{ background: '#fff', borderRadius: '50%', padding: 30, display: 'inline-block' }}>
        <img src="/img/code-svgrepo-com.svg" alt="AI & Software Engineering" style={{ width: 148, height: 148, objectFit: 'cover', display: 'block' }} />
      </div>
    ),
    description: (
      <>
        I’m especially interested in the intersection of <strong>AI and Software Engineering</strong>, with a focus on integrating AI into <strong>distributed, production-scale systems</strong>. Through internships at large tech companies, I’ve gained hands-on experience building and operating real-world systems, and I’m eager to deepen my understanding of deploying reliable, scalable AI in production environments.
      </>
    ),

  }
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 420 }}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Heading as="h3">{title}</Heading>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
