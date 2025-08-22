import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { BsTrophy } from "react-icons/bs";
import { FaGlobeAsia } from "react-icons/fa";
import { motion } from 'framer-motion';

// Component props
interface StatementBlockProps {
  icon: ReactNode;
  title: string;
  text: string;
}

// Styled Components
const Section = styled.section`
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  font-family: 'Inter', sans-serif;
  color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 960px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Block = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;

  svg, img {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div``;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
`;

// Animate on mount
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

// Reusable Statement Block with animation
const StatementBlock: FC<StatementBlockProps> = ({ icon, title, text }) => (
  <Block
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 2, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <IconWrapper>{icon}</IconWrapper>
    <Content>
      <Title>{title}</Title>
      <Description>{text}</Description>
    </Content>
  </Block>
);

const VisionMission: FC = () => {
  return (
    <Section>
      <Grid>
        <StatementBlock
          icon={<BsTrophy />}
          title="Our Vision"
          text="Become the leader in delivering technology solutions to innovate the future."
        />
        <StatementBlock
          icon={<FaGlobeAsia />}
          title="Our Mission"
          text="Deliver pioneering technology solutions while fostering innovation and sustainable business growth."
        />
      </Grid>
    </Section>
  );
};

export default VisionMission;
