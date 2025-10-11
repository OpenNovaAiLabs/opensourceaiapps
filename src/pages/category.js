import React, { Component } from "react"
import * as JsSearch from "js-search"
import {
  Box,
  Icon,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  PseudoBox,
} from "@chakra-ui/core"
import SEO from "../components/seo"
import CompGroup from "../components/CompGroup"

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: [],
      searchResults: [],
      isLoading: true,
      isError: false,
      searchQuery: ``,
      category: "",
      language: "",
      license: "",
    }
  }

  componentDidMount() {
    // Only run search setup in browser
    if (typeof window !== "undefined" && this.props.comps) {
      this.rebuildIndex()
    }
  }

  rebuildIndex = () => {
    const { comps = [] } = this.props
    const dataToSearch = new JsSearch.Search("repo")
    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("repo")

    dataToSearch.addIndex("site")
    dataToSearch.addIndex("name")
    dataToSearch.addIndex("repo")
    dataToSearch.addIndex("license")
    dataToSearch.addIndex("main")
    dataToSearch.addIndex("language")
    dataToSearch.addIndex("category")
    dataToSearch.addDocuments(comps)

    this.setState({ search: dataToSearch, isLoading: false })
  }

  licenseFilter = (e) => {
    const { search, searchQuery, language, category } = this.state
    if (!search) return
    const queryResult = search.search(`${searchQuery} ${e} ${language} ${category}`)
    this.setState({ searchResults: queryResult, license: e })
  }

  languageFilter = (e) => {
    const { search, searchQuery, license, category } = this.state
    if (!search) return
    const queryResult = search.search(`${searchQuery} ${license} ${e} ${category}`)
    this.setState({ searchResults: queryResult, language: e })
  }

  categoryFilter = (e) => {
    const { search, searchQuery, language, license } = this.state
    if (!search) return
    const queryResult = search.search(`${searchQuery} ${license} ${language} ${e}`)
    this.setState({ searchResults: queryResult, category: e })
  }

  searchData = (e) => {
    const { search, license, language, category } = this.state
    if (!search) return
    const queryResult = search.search(`${e} ${license} ${language} ${category}`)
    this.setState({ searchQuery: e, searchResults: queryResult })
  }

  render() {
    const { comps = [], mainInfo = [], loadCount = 10 } = this.props
    const { searchResults, searchQuery, category, language, license } = this.state

    const queryResults =
      searchQuery === `` && license === `` && language === `` && category === ``
        ? comps
        : searchResults

    const compLoad =
      searchQuery === `` && license === `` && language === `` && category === ``
        ? mainInfo.slice(0, loadCount)
        : mainInfo

    const categories = [
      "E-commerce",
      "Hospitality",
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
    ]

    const licenses = [
      "GPL V3",
      "BSD-3",
      "GPL",
      "MIT",
      "OSL-3.0",
      "APACHE 2.0",
      "AGPL V3",
      "CUSTOM",
    ]

    const languages = [
      "GO",
      "JS",
      "PYTHON",
      "PHP",
      "ELIXIR",
      "RUBY",
      "C",
      "C#",
      "C++",
      "SHELL",
      "TS",
      "PERL",
    ]

    return (
      <Box>
        <SEO title="All Open-Source Alternatives" />
        <Box
          bgGradient="linear(to-r, teal.500, blue.600)"
          color="white"
          py={20}
          textAlign="center"
          boxShadow="lg"
          minH="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
            🌐 Open-Source Alternatives
          </Heading>
          <Text fontSize="xl" opacity={0.9} mb={10}>
            Discover, Compare, and Build with the best community-driven tools
          </Text>

          <Box maxW="600px" mx="auto" width="100%" px={4}>
            <InputGroup size="lg">
              <InputLeftElement children={<Icon name="search" color="gray.300" />} />
              <Input
                pr="4.5rem"
                placeholder="Search for any open-source app..."
                value={searchQuery}
                onChange={(e) => this.searchData(e.target.value)}
                boxShadow="md"
                bg="white"
                color="black"
              />
            </InputGroup>
          </Box>
        </Box>

        {/* Results Section */}
        <Box ml="auto" mr="auto" maxWidth="80rem" px={2} py={10}>
          <Box display="flex" flexWrap="wrap" width="100%">
            {compLoad.map((comp) => {
              const match = queryResults.filter((alt) => alt.mainID === comp.id)
              if (match.length > 0) {
                return (
                  <CompGroup
                    key={comp.id}
                    comp={comp}
                    commercial={comp.commercial}
                    alts={match}
                  />
                )
              }
              return null
            })}
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Search
