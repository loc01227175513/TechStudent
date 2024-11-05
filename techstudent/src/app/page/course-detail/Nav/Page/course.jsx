import React from "react";
import { Spinner, Box, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import { ChevronDownIcon, TimeIcon } from "@chakra-ui/icons";

// Utility function to parse time and convert it to a readable format
const parseDuration = (duration) => {
  const parts = duration.split(":");
  if (parts.length === 3) {
    // HH:mm:ss
    return {
      hours: parseInt(parts[0]),
      minutes: parseInt(parts[1]),
      seconds: parseInt(parts[2]),
    };
  } else if (parts.length === 2) {
    // mm:ss
    return {
      hours: 0,
      minutes: parseInt(parts[0]),
      seconds: parseInt(parts[1]),
    };
  }
  return { hours: 0, minutes: 0, seconds: 0 };
};

// Function to calculate total duration
const calculateTotalDuration = (videos) => {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  videos.forEach((video) => {
    const duration = parseDuration(video.thoiluong);
    totalHours += duration.hours;
    totalMinutes += duration.minutes;
    totalSeconds += duration.seconds;
  });

  // Convert seconds to minutes
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds %= 60;

  // Convert minutes to hours
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;

  return { totalHours, totalMinutes };
};

export default function Course({ course, formattedTotalTime }) {
  const { totalHours, totalMinutes } = calculateTotalDuration(course.baihocs.flatMap(baihoc => baihoc.video));

  return (
    <Box className="container mt-4" maxW="container.md">
      <Box p="4" shadow="md" borderWidth="1px" borderRadius="lg">
        <Text fontSize="2xl" fontWeight="bold" mb="2">Nội dung khóa học</Text>
        <Text fontSize="md" color="gray.600">
          {course.baihocs.length} Bài giảng . {totalHours} giờ {totalMinutes} phút
        </Text>
      </Box>

      <Accordion allowMultiple mt="4">
        {course.baihocs.map((baihoc, index) => (
          <AccordionItem key={index} border="none">
            <h2>
              <AccordionButton
                className="shadow-md"
                _hover={{ bg: '#2fa8e0', color: 'white' }}
                transition="background 0.2s ease-in-out"
                p="3"
              >
                <Box flex="1" textAlign="left">
                  <Text fontSize="lg" fontWeight="semibold" className="font-bold">{baihoc.ten}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {baihoc.video.length} Bài giảng . {calculateTotalDuration(baihoc.video).totalHours} giờ {calculateTotalDuration(baihoc.video).totalMinutes} phút
                  </Text>
                </Box>
                <ChevronDownIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <VStack align="start">
                {baihoc.video.map((item, videoIndex) => (
                  <Box key={videoIndex} w="100%" p="2" display="flex" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" className="shadow-md" _hover={{ bg: 'gray.100' }}>
                    <Text>{item.ten}</Text>
                    <Box display="flex" alignItems="center" color="gray.500">
                      <TimeIcon mr="2" />
                      <Text>{parseDuration(item.thoiluong).hours} giờ {parseDuration(item.thoiluong).minutes} phút</Text>
                    </Box>
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
