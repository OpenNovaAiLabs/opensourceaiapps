import React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/core"
import { useJsonForm } from "gatsby-tinacms-json"
import SEO from "../components/seo"
import CompGroup from "../components/CompGroup"

/**
 * Home Page – OpenSource AI Apps
 * Displays a curated list of open-source alternatives to popular commercial applications.
 */

const IndexPage = ({ data }) => {
  const [{ alternatives }] = useJsonForm(data.altsJson, {
    label: "Manage App Comparisons",
    fields: [
      {
        label: "Comparisons",
        name: "rawJson.alternatives",
        component: "group-list",
        description: "List of app comparisons",
        itemProps: (item) => ({
          label: item?.commercial?.[0]?.main || "Untitled Comparison",
        }),
        defaultItem: () => ({
          main: "New Comparison",
          alts: [],
          id: Math.random().toString(36).substr(2, 9),
        }),
        fields: [
          {
            label: "Commercial Apps",
            name: "commercial",
            component: "group-list",
            description: "List of commercial software",
            itemProps: (item) => ({
              label: item.main,
            }),
            fields: [
              { label: "Main Application", name: "main", component: "text" },
              { label: "Website", name: "website", component: "text" },
              { label: "Logo URL", name: "svg", component: "text" },
            ],
          },
          {
            label: "Open Source Alternatives",
            name: "alts",
            component: "group-list",
            description: "List of open-source alternatives",
            itemProps: (item) => ({
              label: item.name,
            }),
            fields: [
              { label: "Name", name: "name", component: "text" },
              { label: "Stars", name: "stars", component: "text" },
              { label: "License", name: "license", component: "text" },
              { label: "Logo URL", name: "svg", component: "text" },
              { label: "Website", name: "site", component: "text" },
              { label: "Language", name: "language", component: "text" },
              { label: "Repository", name: "repo", component: "text" },
              { label: "Deploy Link", name: "deploy", component: "text" },
            ],
          },
          {
            name: "category",
            component: "select",
            label: "Category",
            description: "Select a relevant category",
            options: [
              "E-commerce",
              "Developer Tools",
              "Social Media",
              "Communication",
              "Analytics",
              "Password Managers",
              "Form Builder",
              "Cloud",
              "Deployment",
              "Product Management",
              "Automation",
              "CRM",
              "Visual Database",
            ],
          },
        ],
      },
    ],
  })

  return (
    <>
      <SEO title="OpenSource AI Apps | Discover the Best Free Alternatives" />
      
      {/* Header Section */}
      <Box bg="white" boxShadow="sm" py={6} px={{ base: 4, md: 10 }}>
        <Heading as="h1" size="lg" mb={2}>
          Discover Open-Source Alternatives
        </Heading>
        <Text fontSize="md" color="gray.600">
          Explore free, community-powered software built to replace popular commercial tools.
        </Text>
      </Box>

      {/* Main Content */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        maxW="60rem"
        mx="auto"
        px={3}
        py={6}
      >
        {alternatives?.map((comp, index) => (
          <CompGroup
            key={index}
            comp={comp}
            commercial={comp.commercial}
            alts={comp.alts}
          />
        ))}
      </Box>
    </>
  )
}

export default IndexPage

// GraphQL Query
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    altsJson {
      alternatives {
        commercial {
          main
          svg
          website
        }
        alts {
          name
          license
          stars
          svg
          repo
          site
          language
          deploy
        }
      }
      rawJson
      fileRelativePath
    }
  }
`
