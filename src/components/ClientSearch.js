import React, { Component } from "react";
import * as JsSearch from "js-search";
import {
  Box,
  Icon,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  SimpleGrid,
  Tag,
  TagLabel,
} from "@chakra-ui/core";
import CompGroup from "./CompGroup";

class ClientSearch extends Component {
  state = {
    search: [],
    searchResults: [],
    isLoading: true,
    searchQuery: "",
    category: "",
    language: "",
    license: "",
  };

  componentDidMount() {
    this.rebuildIndex();
  }

  rebuildIndex = () => {
    const dataToSearch = new JsSearch.Search("repo");
    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("repo");

    ["site", "name", "repo", "license", "main", "language", "category"].forEach(
      (field) => dataToSearch.addIndex(field)
    );

    dataToSearch.addDocuments(this.props.comps);
    this.setState({ search: dataToSearch, isLoading: false });
  };

  handleSearch = (query) => {
    const { search, category, language, license } = this.state;
    const queryResult = search.search(`${query} ${category} ${language} ${license}`);
    this.setState({ searchQuery: query, searchResults: queryResult });
  };

  handleFilter = (type, value) => {
    this.setState({ [type]: value }, () => this.handleSearch(this.state.searchQuery));
  };

  render() {
    const { searchQuery, category, language, license, searchResults } = this.state;
    const queryResults =
      searchQuery || category || language || license ? searchResults : this.props.comps;
    const compLoad = this.props.mainInfo.slice(0, this.props.loadCount);

    const categories = [
      "E-commerce", "Hospitality", "Developer Tools", "Social Media",
      "Communication", "Analytics", "Password Managers", "Form Builder",
      "Cloud", "Deployment", "Product Management", "Automation", "CRM",
    ];

    const licenses = ["GPL V3", "BSD-3", "GPL", "MIT", "OSL-3.0", "APACHE 2.0", "AGPL V3", "CUSTOM"];
    const languages = ["GO", "JS", "PYTHON", "PHP", "ELIXIR", "RUBY", "C", "C#", "C++", "SHELL", "TS", "PERL"];

    return (
      <Box>
        {/* Hero Section */}
        <Box
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          textAlign="center"
          py={20}
          px={4}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Discover Open-Source Alternatives
          </Heading>
          <Text fontSize="xl" maxWidth="600px" mx="auto">
            Explore open-source alternatives for your favorite commercial apps, all in one place.
          </Text>
          <InputGroup size="lg" mt={8} maxWidth="500px" mx="auto">
            <InputLeftElement children={<Icon name="search" color="gray.300" />} />
            <Input
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => this.handleSearch(e.target.value)}
              bg="white"
              color="black"
              borderRadius="md"
            />
          </InputGroup>
        </Box>

        {/* Filters */}
        <Box display="flex" flexDirection={{ base: "column", md: "row" }} maxWidth="1200px" mx="auto" mt={8} px={4}>
          <Box minWidth="200px" mr={{ md: 6 }} mb={{ base: 6, md: 0 }}>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>Categories</Text>
              <Box display="flex" flexWrap="wrap">
                {["All", ...categories].map((c) => (
                  <Tag
                    key={c}
                    size="sm"
                    m={1}
                    variant={category === c || (c === "All" && category === "") ? "solid" : "subtle"}
                    colorScheme="blue"
                    cursor="pointer"
                    onClick={() => this.handleFilter("category", c === "All" ? "" : c)}
                  >
                    <TagLabel>{c}</TagLabel>
                  </Tag>
                ))}
              </Box>
            </Box>

            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>License</Text>
              <Box display="flex" flexWrap="wrap">
                {["All", ...licenses].map((l) => (
                  <Tag
                    key={l}
                    size="sm"
                    m={1}
                    variant={license === l || (l === "All" && license === "") ? "solid" : "subtle"}
                    colorScheme="green"
                    cursor="pointer"
                    onClick={() => this.handleFilter("license", l === "All" ? "" : l)}
                  >
                    <TagLabel>{l}</TagLabel>
                  </Tag>
                ))}
              </Box>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>Language</Text>
              <Box display="flex" flexWrap="wrap">
                {["All", ...languages].map((l) => (
                  <Tag
                    key={l}
                    size="sm"
                    m={1}
                    variant={language === l || (l === "All" && language === "") ? "solid" : "subtle"}
                    colorScheme="orange"
                    cursor="pointer"
                    onClick={() => this.handleFilter("language", l === "All" ? "" : l)}
                  >
                    <TagLabel>{l}</TagLabel>
                  </Tag>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Results Grid */}
          <Box flex="1">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {compLoad.map((comp) => {
                const match = queryResults.filter((alt) => alt.mainID === comp.id);
                if (match.length > 0) {
                  return <CompGroup key={comp.id} comp={comp} commercial={comp.commercial} alts={match} />;
                }
              })}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ClientSearch;
