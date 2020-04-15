import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { RouteComponentProps } from "@reach/router";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

/***************************************************************
  Below are some examples of using styled-components with the
  theme and framer-motion.
/***************************************************************

/*
  3. A styled component that extends a framer-motion component.
  (animation props applied in the component instance)
*/

const OrangeBlock = styled(motion.div)`
  background: orange;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  margin: 10px;
`;

/*
  4. A styled component that extends a framer-motion component.
  (animation props applied in the styled-component definition
  via the attrs method)
*/
const BlueBlock = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 2 },
  whileHover: { scale: 0.8 },
}))`
  background: blue;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  margin: 10px;
`;

const BlocksWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const AboutPage: React.FC<RouteComponentProps> = ({ location = {} }) => {
  const path = location.pathname;
  return (
    <Layout>
      <SEO
        title="About gatsby-starter-template-deluxe"
        description="Examples using the gatsby-starter-template-deluxe."
      />
      <h3>
        Hi, you are on the <code>{path}</code> page!
      </h3>

      <BlocksWrapper>
        <OrangeBlock
          animate={{ rotate: 360 }}
          transition={{ duration: 2 }}
          whileHover={{ rotate: 1.1 }}
        />
        <BlueBlock />
      </BlocksWrapper>
    </Layout>
  );
};

export default AboutPage;
