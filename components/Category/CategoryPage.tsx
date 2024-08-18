"use client";

import { Project } from "@/lib/types";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { getCategoriesDataUrl } from "@/lib/_utils";
import { useContext } from "react";
import { VisitedProjects } from "../Layout";

const cmsBaseUrl = process.env.NEXT_PUBLIC_CMS_BASE_URL;

type Props = {
  projects: Project[];
};

export function CategoryPage({ projects }: Props) {
  return (
    <Container>
      <ImageSection>
        {cmsBaseUrl &&
          projects?.map((project, index) => {
            const imageData = project.attributes.Titelbild.data;

            const category = project.attributes.category;

            const {
              attributes: { alternativeText, url, width, height },
            } = imageData;

            return (
              <ImageWrapper
                href={`${category}/${project.id}`}
                key={project.id}
                className={`item${index + 1}`}
                $title={project.attributes.Titel}
              >
                <StyledImage
                  placeholder="blur"
                  blurDataURL={getCategoriesDataUrl(category)}
                  src={cmsBaseUrl + url}
                  width={width}
                  height={height}
                  alt={alternativeText || ""}
                />
              </ImageWrapper>
            );
          })}
      </ImageSection>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  max-width: 1200px;
  margin: 170px auto;
`;

const ImageSection = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  .item1 {
    height: 400px;
  }
  .item2 {
    height: 400px;
  }
  .item3 {
    height: 400px;
  }
  .item4 {
    height: 400px;
  }
  .item5 {
    grid-row: 2 / span 1;
    grid-column: 2 / span 2;
    height: 400px;
  }
  .item6 {
    grid-row: 3 / span 2;
    grid-column: 1 / span 2;
  }
  .item7 {
    grid-row: 3 / span 1;
    grid-column: 3 / span 1;
  }
  .item8 {
    grid-row: 3 / span 1;
    grid-column: 4 / span 1;
  }
  .item9 {
    grid-row: 4 / span 1;
    grid-column: 3 / span 2;
  }
  .item10 {
    grid-row: 5 / span 1;
    grid-column: 1 / span 1;
  }
  .item11 {
    grid-row: 5 / span 1;
    grid-column: 2 / span 1;
  }
  .item12 {
    grid-row: 5 / span 1;
    grid-column: 3 / span 1;
  }
  .item13 {
    grid-row: 5 / span 1;
    grid-column: 4 / span 1;
  }
`;

const ImageWrapper = styled(Link)<{ $title: string }>`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio */
  &:after {
    position: absolute;
    content: "${({ $title }) => `${$title}`}";
    top: 50%;
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #ffff00;
    transform: translateY(-50%) scale(0);
  }
  &:hover {
    cursor: pointer;
    &:after {
      transform: translateY(-50%) scale(1);
    }
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
