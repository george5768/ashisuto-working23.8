import React, { FC } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Accolade {
  id: number;
  logoSrc: string;
  logoAlt: string;
  title: string;
  description: string;
}

const accoladesData: Accolade[] = [
  {
    id: 1,
    logoSrc: '/images/md-logo.png',
    logoAlt: 'MD Logo',
    title: 'Top Innovation Award 2025',
    description: 'We are recognized by the Malaysian government as an enabler for Artificial Intelligence, Blockchain and BigData by obtaining MD Status (MALAYSIA DIGITAL COMPANY STATUS) from MDEC (Malaysia Digital Economy Corporation).',
  },
  {
    id: 2,
    logoSrc: '/images/IPAG.png',
    logoAlt: 'IPAG Logo',
    title: 'R & D Status Company by MIDA',
    description: 'Innovasi Penyelidikan AG Sdn. Bhd., a company under Ashisuto Group of Companies was awarded R&D Status by the Malaysia Investment Development Authority. We are recognized as a competent and trust-worthy solutions provider. Our clients are able to enjoy double tax exemption when they engage us to simplify digital transformation with our extensive suite of innovative solutions. ',
  },
  {
    id: 3,
    logoSrc: '/images/MOF.jpeg',
    logoAlt: 'MOF logo',
    title: 'Registered Company with Ministry of Finance, Malaysia',
    description: 'We are recognized as a competent and trust-worthy solutions provider. We serve public sector and government linked companies, with our secure solutions that continuously help drive nations towards adopting IR 4.0 best practices for digital transformation. ',
  },
];

const Section = styled.section`
  padding: 5rem 2rem;
  background: #fefefe;
  font-family: 'Inter', sans-serif;
`;

const Grid = styled(motion.div)`
  max-width: 1040px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
`;

const Card = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  background: #fff;
  border: 1px solid #eee;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.div`
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Text = styled.div`
  flex: 1;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;


const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #222;
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: #555;
  line-height: 1.6;
`;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const AccoladesGrid: FC = () => {
  return (
    <Section>
      <Grid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {accoladesData.map(({ id, logoSrc, logoAlt, title, description }) => (
          <Card key={id} variants={itemVariants}>
            <Logo>
              <Image src={logoSrc} alt={logoAlt} width={200} height={200} />
            </Logo>
            <Text>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Text>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default AccoladesGrid;
