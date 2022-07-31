import { Col, Container, Row } from 'react-bootstrap';
import { Heading } from '../components/Heading';
import Sidebar from '../components/Sidebar';
import faqData from '../data/faqsData.json';
import FAQ from '../components/FAQ';

const FrecuentlyAskedQuestions = () => {
  return (
    <Container className="my-5">
      <Row>
        <Sidebar />
        <Col>
          <Heading className="h3">Preguntas frecuentes</Heading>
          <section>
            {faqData.map((faq) => (
              <FAQ key={faq.id} {...faq} />
            ))}
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default FrecuentlyAskedQuestions;