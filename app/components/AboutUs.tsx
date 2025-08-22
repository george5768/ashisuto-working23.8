import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { BsYoutube } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const Wrapper = styled.section`
  padding: 6rem 2rem;
  background: #fff;
  color: #111;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: 960px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const Tagline = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: #666;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: #444;
  margin-bottom: 1.5rem;
`;

const Signature = styled.span`
  font-style: italic;
  font-size: 1rem;
  color: #888;
`;

// ➕ NEW Block
const ExtendedBlock = styled.div`
  margin-top: 4rem;
  max-width: 960px;
  width: 100%;
`;

const AboutUs: FC = () => {
  return (
    <Wrapper>
      <Content>
        <Left>
          <Title>About <span className='text-primary'>Us</span></Title>
          <Tagline>Assisting Digital Transformation</Tagline>
        </Left>
        <Right>
          <Text>
            Assisting industries in their Digital Transformation Journey and helping them benefit from our cost efficient and customized solutions that are quick to deploy.
          </Text>
          <Text>
            Ashisuto is translated from Japanese to &quot;Assist You&quot;, our solutions are designed with this core belief. Our customer first attitude is represented by the way we develop tailored solutions designed to overcome digitalization challenges  helping business to adopt the best practices for document management and record keeping.
          </Text>
          <Signature className='flex justify-between gap-5 mx-30 my-5'><Link href={"https://www.youtube.com/@ashisutoglobaltechnologies6942"}><BsYoutube className="text-red-600"/>
                        </Link>
                        <Link href={"https://www.linkedin.com/company/ashisuto-global-technologies/"}><FaLinkedinIn className="text-blue-700"/></Link>
                        <Link href={"https://www.instagram.com/ashisutoglobal/"}><FaInstagram className="text-red-400"/></Link>
                        <Link href={"https://www.facebook.com/ashito.glo"}><FaFacebook className="text-blue-600"/></Link></Signature>
        </Right>
      </Content>

      <ExtendedBlock>
        <Text>
          We are a digital transformation (DX) company providing digitalization solutions to industries based on cutting edge technology including AI, Machine Learning, Deep Learning, Blockchain and IoT technology for developing both application and embedded systems.
        </Text>
        <Text>
          Ashisuto Global Technologies is the key to helping companies bring business processes onto one global and digital ecosystem platform.  A system that can be used whenever and wherever, with this vision we help companies achieve a digital reality.
          Being recognized as business consultants and digital transformation specialists, we provide extensive and comprehensive support to both international and local, private and public corporations. Helping to build a secure business environment for our clients. We are committed to serving you with our range of innovative and customizable solutions. 
        </Text>
      </ExtendedBlock>
      <Link href={"/docKITA"} className='gap-y-5 mt-5'><Button>Explore Solutions</Button></Link>
    </Wrapper>
  );
};

export default AboutUs;
