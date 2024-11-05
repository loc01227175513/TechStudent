// Page.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Fade } from "@chakra-ui/react";
import { Landscape, Portrait } from "./ChungChi";
import { ChungChi, ChonChungChi } from "../../../../service/ChungChi/ChungChi";
import { ToastContainer, toast } from "react-toastify";


export default function Page() {
  const [view, setView] = useState("Landscape");
  const [chungchi, setChungChi] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    ChungChi().then((data) => {
      setChungChi(data.data);
      console.log("chungchi", data);
    });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    toast.info(`Certificate with ID ${id} has been selected.`, {
      title: "Certificate Selected",
      autoClose: 3000,
    });
  };
  console.log("selectedId", selectedId);

  const handlePublish = () => {
    if (selectedId) {
      const id = selectedId;
      ChonChungChi(id)
        .then((data) => {
          console.log("data", data);
          toast.success("The certificate has been published successfully.", {
            title: "Certificate Published",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error("Error publishing certificate", error);
          toast.error("There was an error publishing the certificate.", {
            title: "Publish Failed",
            autoClose: 3000,
          });
        });
    } else {
      toast.warn("Please select a certificate before publishing.", {
        title: "No Certificate Selected",
        autoClose: 3000,
      });
      console.log("No ID selected");
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
    toast.success(`Switched to ${newView.toLowerCase()} view.`, {
      title: `${newView} View`,
      autoClose: 2000,
    });
  };

  const handlePreview = () => {
    toast.info("Previewing the selected certificate.", {
      title: "Preview",
      autoClose: 2000,
    });
    // Add preview functionality here
  };

  return (
    <Box p={5} bg="gray.50" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb={4} color="#32ADE6" id="headingSeven" textAlign="center">
        Certificate Template
      </Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab
            isActive={view === "Landscape"}
            onClick={() => handleViewChange("Landscape")}
            _selected={{ bg: "#32ADE6", color: "white" }}
            p={4}
            color="#32ADE6"
            _hover={{ color: "white", bg: "#28b99c" }}
          >
            <i className="fa-sharp fa-light fa-pager p-2" /> Landscape
          </Tab>
          <Tab
            isActive={view === "Portrait"}
            onClick={() => handleViewChange("Portrait")}
            _selected={{ bg: "#32ADE6", color: "white" }}
            p={4}
            color="#32ADE6"
            _hover={{ color: "white", bg: "#28b99c" }}
          >
            <i className="fa-sharp fa-light fa-pager p-2" /> Portrait
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Fade in={view === "Landscape"} transition={{ enter: { duration: 0.5 } }}>
              {view === "Landscape" && <Landscape chungchi={chungchi} onSelect={handleSelect} />}
            </Fade>
          </TabPanel>
          <TabPanel>
            <Fade in={view === "Portrait"} transition={{ enter: { duration: 0.5 } }}>
              {view === "Portrait" && <Portrait chungchi={chungchi} onSelect={handleSelect} />}
            </Fade>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box mt={4}>
        <HStack spacing={4}>
          <Button colorScheme="teal" variant="solid" p={6} bg="#32ADE6" textColor="white" onClick={handlePreview}>
            <i className="fa-light fa-eye p-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handlePublish}>
            Publish <i className="fa-light fa-arrow-right p-2" />
          </Button>
        </HStack>
      </Box>
      <ToastContainer />
    </Box>
  );
}