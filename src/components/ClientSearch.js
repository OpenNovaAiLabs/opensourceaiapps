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
  Button,
  PseudoBox,
} from "@chakra-ui/core"
import CompGroup from "./CompGroup"

class Search extends Component {
  state = {
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: ``,
    category: "",
    language: "",
    license: "",
  }

  async componentDidMount() {
    this.rebuildIndex()
  }

  rebuildIndex = () => {
    const dataToSearch = new JsSearch.Search(`repo`)
    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex(`repo`)

    dataToSearch.addIndex(`site`)
    dataToSearch.addIndex(`name`)
    dataToSearch.addIndex(`repo`)
    dataToSearch.addIndex(`license`)
    dataToSearch.addIndex(`main`)
    dataToSearch.addIndex(`language`)
    dataToSearch.addIndex(`category`)

    dataToSearch.addDocuments(this.props.comps)
    this.setState({ search: dataToSearch, isLoading: false })
  }

  licenseFilter = (e) => {
    const { search, searchQuery, language, category } = this.state
    const queryResult = search.search(`${searchQuery} ${e} ${language} ${category}`)
    this.setState({ searchResults: queryResult, license: e })
  }

  languageFilter = (e) => {
    const { search, searchQuery, license, category } = this.state
    const queryResult = search.search(`${searchQuery} ${license} ${e} ${category}`)
    this.setState({ searchResults: queryResult, language: e })
  }

  categoryFilter = (e) => {
    const { search, searchQuery, language, license } = this.state
    const queryResult = search.search(`${searchQuery} ${license} ${language} ${e}`)
    this.setState({ searchResults: queryResult, category: e })
  }

  searchData = (e) => {
    const { search, license, language, category } = this.state
    const queryResult = search.search(`${e} ${license} ${language} ${category}`)
    this.setState({ searchQuery: e, searchResults: queryResult })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { searchResults, searchQuery, category, language, license } = this.state

    const queryResults =
      searchQuery === `` && license === `` && language === `` && category === ``
        ? this.props.comps
        : searchResults

    const compLoad =
      searchQuery === `` && license === `` && language === `` && category === ``
        ? this.props.mainInfo.slice(0, this.props.loadCount)
        : this.props.mainInfo

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
        {/* Full-screen Landing Page */}
        <Box
          minH="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgGradient="linear(to-br, blue.300, cyan.400)"
          color="white"
          textAlign="center"
          px={6}
        >
          <Heading
            as="h1"
            size="2xl"
            fontWeight="extrabold"
            letterSpacing="wide"
            mb={4}
          >
            🚀 Open-Source Alternatives
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            opacity={0.9}
            mb={8}
            maxW="2xl"
          >
            Discover, compare, and build with the best community-driven tools.
          </Text>

          {/* Centered Search Bar */}
          <Box width={{ base: "100%", md: "40rem" }} mb={12}>
            <InputGroup size="lg" bg="white" borderRadius="full" boxShadow="lg">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon name="search" color="gray.400" />}
              />
              <Input
                pr="4.5rem"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => this.searchData(e.target.value)}
                borderRadius="full"
                color="gray.700"
                bg="white"
                _focus={{ borderColor: "teal.500" }}
              />
            </InputGroup>
          </Box>

          <Button
            size="lg"
            colorScheme="teal"
            bg="whiteAlpha.200"
            _hover={{ bg: "whiteAlpha.300" }}
            borderRadius="full"
            px={8}
          >
            Explore Categories ↓
          </Button>
        </Box>

        {/* Search & Filters Section (unchanged) */}
        <Box ml="auto" mr="auto" maxWidth="80rem" px={2} py={8}>
          <Box
            display="flex"
            alignItems="flex-start"
            flexDirection={{ base: "column", md: "row" }}
          >
            {/* Filters Sidebar */}
            <Box
              p={3}
              maxWidth={{ base: "100%", md: "18rem" }}
              bg="white"
              boxShadow="md"
              borderRadius={4}
              mx={1}
              mb={6}
            >
              {/* Category Filter */}
              <Box mb={5}>
                <Box color="gray.600" mx={2} mb={1} fontWeight={500}>
                  Categories
                </Box>
                <Box display="flex" flexWrap="wrap">
                  <PseudoBox
                    px={3}
                    py={1}
                    m={1}
                    borderRadius={4}
                    color="white"
                    fontWeight={600}
                    fontSize="sm"
                    letterSpacing="wide"
                    bg={category === "" ? "#122a4f" : "#2b4a7b"}
                    textTransform="uppercase"
                    _hover={category !== "" && { bg: "#1a3765" }}
                    onClick={() => this.categoryFilter("")}
                    cursor="pointer"
                  >
                    All
                  </PseudoBox>
                  {categories.map((c) => (
                    <PseudoBox
                      key={c}
                      px={3}
                      py={1}
                      m={1}
                      borderRadius={4}
                      color="white"
                      fontWeight={600}
                      letterSpacing="wide"
                      fontSize="sm"
                      bg={category === c ? "#122a4f" : "#2b4a7b"}
                      textTransform="uppercase"
                      _hover={category !== c && { bg: "#1a3765" }}
                      onClick={() => this.categoryFilter(c)}
                      cursor="pointer"
                    >
                      {c}
                    </PseudoBox>
                  ))}
                </Box>
              </Box>

              {/* License Filter */}
              <Box mb={5}>
                <Box color="gray.600" mx={2} mb={1} fontWeight={500}>
                  License
                </Box>
                <Box display="flex" flexWrap="wrap">
                  <PseudoBox
                    px={3}
                    py={1}
                    m={1}
                    borderRadius={4}
                    color="white"
                    fontWeight={600}
                    letterSpacing="wide"
                    fontSize="sm"
                    bg={license === "" ? "#122a4f" : "#00bf70"}
                    textTransform="uppercase"
                    _hover={license !== "" && { bg: "#029c5d" }}
                    onClick={() => this.licenseFilter("")}
                    cursor="pointer"
                  >
                    All
                  </PseudoBox>
                  {licenses.map((c) => (
                    <PseudoBox
                      key={c}
                      px={3}
                      py={1}
                      m={1}
                      borderRadius={4}
                      color="white"
                      fontWeight={600}
                      fontSize="sm"
                      letterSpacing="wide"
                      bg={license === c ? "#122a4f" : "#00bf70"}
                      textTransform="uppercase"
                      _hover={license !== c && { bg: "#029c5d" }}
                      onClick={() => this.licenseFilter(c)}
                      cursor="pointer"
                    >
                      {c}
                    </PseudoBox>
                  ))}
                </Box>
              </Box>

              {/* Language Filter */}
              <Box>
                <Box color="gray.600" mx={2} mb={1} fontWeight={500}>
                  Language
                </Box>
                <Box display="flex" flexWrap="wrap">
                  <PseudoBox
                    px={3}
                    py={1}
                    m={1}
                    borderRadius={4}
                    color="white"
                    fontSize="sm"
                    fontWeight={600}
                    letterSpacing="wide"
                    bg={language === "" ? "#122a4f" : "orange.500"}
                    textTransform="uppercase"
                    _hover={language !== "" && { bg: "#af5417" }}
                    onClick={() => this.languageFilter("")}
                    cursor="pointer"
                  >
                    All
                  </PseudoBox>
                  {languages.map((c) => (
                    <PseudoBox
                      key={c}
                      px={3}
                      py={1}
                      m={1}
                      borderRadius={4}
                      color="white"
                      fontWeight={600}
                      letterSpacing="wide"
                      fontSize="sm"
                      bg={language === c ? "#122a4f" : "orange.500"}
                      textTransform="uppercase"
                      _hover={language !== c && { bg: "#af5417" }}
                      onClick={() => this.languageFilter(c)}
                      cursor="pointer"
                    >
                      {c}
                    </PseudoBox>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Results Section */}
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
      </Box>
    )
  }
}

export default Search
