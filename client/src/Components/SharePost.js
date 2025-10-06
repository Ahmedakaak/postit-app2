import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
} from "reactstrap";
const SharePosts = () => {
  return (
    <Container>
      <Row>
        <Col className="mt-2">
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
          />

          <Button className="mt-2">PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
