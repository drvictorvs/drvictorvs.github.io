import React from "react";
import { useAppContext } from "../appContext";
import { useSelector } from "react-redux";
import {
  selectData,
  selectError,
  selectIsLoading,
} from "../pages/allRepositoriesSlice";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
// Media
import { Icon } from "@iconify/react";
import Logo from "../images/logo.svg"
// Components
import { Button, Col, Container, Row } from "react-bootstrap";
import { Title, Loading } from "./globalStyledComponents";
import RepositoryCard from "./RepositoryCard";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";

const filteredRepositories = ["phd", "Pokemon-Switch-V2-Model-Importer-Blender", "drvictorvs.github.io"];

export const projectCardImages = [
  {
    name: "example-1",
    image: Logo,
  },
];

export default function Repositories() {
  const [mainRepositories, setMainRepositories] = React.useState([]);
  const { themeName, lang } = useAppContext();
  const strings = lang === "en" ? LangEN.navmenu : LangPT.navmenu;
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const data = useSelector(selectData);

  React.useEffect(
    function () {
      const tempData = [];
      data.forEach((el, i) => (tempData[i] = Object.create(el)));
      if (data.length !== 0 && filteredRepositories.length !== 0) {
        const tempArray = tempData.filter((obj) =>
          filteredRepositories.includes(obj.name)
        );
        tempArray.length !== 0
          ? setMainRepositories([...tempArray])
          : setMainRepositories([...tempData.slice(0, 3)]);
      } else {
        setMainRepositories([...tempData.slice(0, 3)]);
      }
    },
    [data]
  );

  return (
    <Element name={"Repositories"} id="Repositories">
      <section className="section">
        <Container>
          <Container className="d-flex">
            <Title>
              <h2>{strings.repositories}</h2>
              <div className="underline"></div>
            </Title>
          </Container>
          {isLoading && (
            <Container className="d-flex">
              <Loading />
            </Container>
          )}
          {error && <h2 className="text-center">{error}</h2>}
          {!error && data.length === 0 && (
            <h2 className="text-center">
              Oops, you do not have any GitHub Repositories yet...
            </h2>
          )}
          {mainRepositories.length !== 0 && (
            <>
              <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
                {mainRepositories.map(function ({
                  id,
                  image,
                  name,
                  description,
                  html_url,
                  homepage,
                }) {
                  return (
                    <Col key={id}>
                      <RepositoryCard
                        image={image}
                        name={name}
                        description={description}
                        url={html_url}
                        demo={homepage}
                      />
                    </Col>
                  );
                })}
              </Row>
              {data.length > 3 && (
                <Container className="text-center mt-5">
                  <Link to="/All-Repositories">
                    <Button
                      size="lg"
                      variant={
                        themeName === "light" ? "outline-dark" : "outline-light"
                      }
                    >
                      All <Icon icon="icomoon-free:github" /> Repositories
                    </Button>
                  </Link>
                </Container>
              )}
            </>
          )}
        </Container>
      </section>
    </Element>
  );
}
