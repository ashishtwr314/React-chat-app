import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Button,
  Card,
  Item,
  Icon
} from "semantic-ui-react";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Container className="hero-banner" fluid textAlign="center">
        <Container>
          <Grid verticalAlign="middle" columns={2}>
            <Grid.Row>
              <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
                verticalAlign="middle"
                textAlign="left"
                className="grid-item hero-banner-content"
              >
                <Header className="heading" inverted color="" as="h1">
                  Minimalistic & Simple
                  <br />
                  Secure Messaging App
                </Header>
                <Header className="sub-heading" inverted as="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Header>
                <Button.Group className="btns" size="large">
                  <Button color="purple">
                    <Link to="/signup">Signup</Link>
                  </Button>
                  <Button.Or />
                  <Button color="black">
                    <Link to="/login">Login</Link>
                  </Button>
                </Button.Group>
              </Grid.Column>

              <Grid.Column
                computer={8}
                tablet={8}
                only="tablet computer"
                verticalAlign="middle"
                className="grid-item hero-banner-image"
              >
                <Image centered src="/hero-image.png" className="hero-image" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>

      <Container id="tech-used" className="tech-used" fluid>
        <Container>
          <Segment basic clearing>
            <Header as="h2" floated="left">
              Products Chat App uses
            </Header>
            <Header as="h2" floated="right">
              Icon
            </Header>
          </Segment>

          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column
                className="tech-card"
                computer={8}
                tablet={8}
                mobile={16}
              >
                <Card fluid>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        className="item-image"
                        size="tiny"
                        src="/html5Logo.png"
                      />

                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">HTML 5</Item.Header>
                        <Item.Description>
                          HTML5 is a software solution stack that defines the
                          properties and behaviors of web page content by
                          implementing a markup based pattern to it.{" "}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
              </Grid.Column>

              <Grid.Column
                className="tech-card"
                computer={8}
                tablet={8}
                mobile={16}
              >
                <Card fluid>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        className="item-image"
                        size="tiny"
                        src="/css3Logo.svg"
                      />

                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">CSS 3</Item.Header>
                        <Item.Description>
                          Cascading Style Sheets (CSS) is a style sheet language
                          used for describing the presentation of a document
                          written in a markup language like HTML
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column
                className="tech-card"
                computer={8}
                tablet={8}
                mobile={16}
              >
                <Card fluid>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        className="item-image"
                        size="tiny"
                        src="/reactJSLogo.svg"
                      />

                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">
                          React.JS - JS Framework
                        </Item.Header>
                        <Item.Description>
                          React (also known as React.js or ReactJS) is a
                          JavaScript library[3] for building user interfaces. It
                          is maintained by Facebook and a community of
                          individual developers and companies.
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
              </Grid.Column>

              <Grid.Column
                className="tech-card"
                computer={8}
                tablet={8}
                mobile={16}
              >
                <Card fluid>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        className="item-image"
                        size="tiny"
                        src="/firebaseLogo.png"
                      />

                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">
                          Firebase - Backend System
                        </Item.Header>
                        <Item.Description>
                          Firebase is a mobile and web application development
                          platform developed by Firebase, Inc. in 2011, then
                          acquired by Google in 2014. As of October 2018, the
                          Firebase platform has 18 products, which are used by
                          1.5 million apps.
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column
                className="tech-card"
                computer={8}
                tablet={8}
                mobile={16}
              >
                <Card fluid>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        className="item-image"
                        size="tiny"
                        src="/semanticLogo.png"
                      />

                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">Semantic UI for React</Item.Header>
                        <Item.Description>
                          Semantic UI treats words and classes as exchangeable
                          concepts. Classes use syntax from natural languages
                          like noun/modifier relationships, word order, and
                          plurality to link concepts intuitively. Get the same
                          benefits as BEM or SMACSS, but without the tedium.
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
              </Grid.Column>

              <Grid.Column
                className="tech-card"
                computer={8}
                tablet={8}
                mobile={16}
              >
                <Card fluid>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        className="item-image"
                        size="tiny"
                        src="/DSALogo.png"
                      />

                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">
                          Efficient Usage of Data Structures and Algoritms
                        </Item.Header>
                        <Item.Description>
                          In mathematics and computer science, an algorithm is a
                          finite sequence of well-defined,
                          computer-implementable instructions, typically to
                          solve a class of problems or to perform a computation.
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>

      <Container id="about-dev" fluid className="about-dev">
        <Container>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column computer={8} tablet={8} mobile={16}>
                <Segment basic className="contact-buttons">
                  <Segment basic>
                    Connect & Hire & work with me on Linkedin at: <br />
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/ashishtwr314/"
                    >
                      <Button color="linkedin">
                        <Icon name="linkedin" /> LinkedIn
                      </Button>
                    </a>
                  </Segment>

                  <Segment basic>
                    Get to know more about my personal and professional life on
                    Instagram at: <br />
                    <a
                      target="_blank"
                      href="https://www.instagram.com/ash.web_developer/"
                    >
                      <Button color="instagram">
                        <Icon name="instagram" /> Instagram
                      </Button>
                    </a>
                  </Segment>
                  <Segment basic>
                    See my previous and upcomig project on Github at: <br />
                    <a target="_blank" href="https://github.com/ashishtwr314">
                      <Button color="black">
                        <Icon name="github" /> Github
                      </Button>
                    </a>
                  </Segment>
                  <Segment basic>
                    Who uses Facebook these days but still, Follow my work at:
                    <br />
                    <a
                      target="_blank"
                      href="https://www.facebook.com/profile.php?id=100022045701879"
                    >
                      <Button color="facebook">
                        <Icon name="facebook" /> Facebook
                      </Button>
                    </a>
                  </Segment>
                </Segment>
              </Grid.Column>

              <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
                verticalAlign="middle"
                textAlign="center"
                className="map-container"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5016.5596423240395!2d82.0597880990015!3d19.06787423130682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x625025bf654f0fe9!2sAshish%20Home%2C%20Adawal%2C%20Chhattisgarh%20494001%2C%20India!5e0!3m2!1sen!2sin!4v1580885186319!5m2!1sen!2sin"
                  width="400"
                  height="250"
                  className="map"
                  frameborder="0"
                  style={{ border: "0" }}
                  allowfullscreen=""
                ></iframe>
                <Segment className="contact" basic>
                  <b>
                    {" "}
                    <a href="#">ashishtwr314@gmail.com</a>
                    <a href="#"> | 8358955449 </a>
                    <a href="#"> | 7987615374 </a>{" "}
                  </b>
                </Segment>
                <Header className="or-text" as="h6">
                  OR{" "}
                </Header>
                <Segment className="address" basic>
                  Walk in at: <br />
                  <br />
                  <b>
                    Ashish Tiwari, Adawal, Ward No.5, Near Hanuman Temple,
                    Jagdalpur, Bastar (494001) Chhattisgarh
                  </b>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Home;
