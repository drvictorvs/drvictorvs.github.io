import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { useAppContext } from "../appContext";
import {
  selectData,
  selectError,
  selectIsLoading,
} from "../pages/allRepositoriesSlice";
// Media
import { Icon } from "@iconify/react";
import { BigLogo } from "./Resources";
// Components
import { Button, Col, Container, Row } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";
import RepositoryCard from "./RepositoryCard";
import { Loading, Title } from "./globalStyledComponents";
import {HorizontalScroller} from "./Publications";
export const filteredRepositories = ["phd", "Pokemon-Switch-V2-Model-Importer-Blender", "drvictorvs.github.io"];

const BlenderLogo = <Icon icon="logos:blender" className="card-img-top mx-auto" />;

export const projectCardImages = [
  {
    name: "phd",
    image: <BigLogo style={{height:"100%", width:"100%"}} />,
  },
  {
    name: "Pokemon-Switch-V2-Model-Importer-Blender",
    image: BlenderLogo,
  },
  {
    name: "drvictorvs.github.io",
    image: <BigLogo style={{height:"100%", width:"100%"}} />,
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
          {error && <h2 className="text-center">{strings.error}</h2>}
          {!error && data.length === 0 && (
            <h2 className="text-center">
              {strings.noRepos && strings.noRepos}
            </h2>
          )}
          
          {mainRepositories.length !== 0 && (
            <HorizontalScroller>
                {mainRepositories.map(function ({
                  id,
                  image,
                  name,
                  description,
                  repo_lang,
                  html_url,
                  homepage,
                }) {
                  return (
                      <RepositoryCard 
                        key={id}
                        image={image}
                        name={name}
                        description={description}
                        repo_lang={repo_lang}
                        url={html_url}
                        demo={homepage}
                      />
                  );
                })}
              {data.length > 3 && (
                <Container className="text-center mt-5">
                  <Link to="/AllRepositories">
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
              </HorizontalScroller>
          )}
        </Container>
      </section>
    </Element>
  );
}
