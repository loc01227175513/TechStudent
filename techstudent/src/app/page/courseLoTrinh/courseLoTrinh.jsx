"use client";
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Heading, Image, Text, Flex } from '@chakra-ui/react';
import { LoTrinhKhoaHoc, LoTrinhKhoaHocCon } from "../../../service/Lotrinh/Lotrinh";
import { FaBook } from 'react-icons/fa';
import Link from 'next/link'; // Ensure you import Link from your routing library
import 'tailwindcss/tailwind.css';

export default function Roadmap() {
    const [loTrinhKhoaHoc, setLoTrinhKhoaHoc] = useState([]);
    const [loTrinhKhoaHocCon, setLoTrinhKhoaHocCon] = useState([]);
    const [hoveredCourse, setHoveredCourse] = useState(null);

    useEffect(() => {
        LoTrinhKhoaHoc().then((response) => {
            setLoTrinhKhoaHoc(response);
        }).catch(error => console.error(error));

        LoTrinhKhoaHocCon().then((response) => {
            setLoTrinhKhoaHocCon(response);
        }).catch(error => console.error(error));
    }, []);

    const getSubCourses = (courseId) => {
        return loTrinhKhoaHocCon.filter(subCourse => subCourse.id_lotrinhkhoahoc === courseId);
    };

    return (
        <Box mb={60} my={12} px={6} pb={12}> {/* Added pb={12} for padding bottom */}
            <Heading as="h1" size="2xl" mb={6} className="font-sans text-blue-500">Lộ trình khóa học</Heading>
            <Text color="gray.500" fontSize="lg" mb={6} className="font-sans">Plan your learning journey with a clear roadmap.</Text>

            <Flex direction="row" align="center">
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={8}>
                    {loTrinhKhoaHoc.map(course => (
                        <Box
                            key={course.id}
                            p={6}
                            bg="gray.50"
                            borderWidth="1px"
                            borderRadius="lg"
                            borderColor="blue.400" // Updated to blue border
                            shadow="md"
                            _hover={{ shadow: 'lg', bg: 'gray.100' }}
                            position="relative"
                            onMouseEnter={() => setHoveredCourse(course.id)}
                            onMouseLeave={() => setHoveredCourse(null)}
                            transition="all 0.3s ease"
                            width="100%"
                        >
                            <Image src={course.hinh} alt={course.ten} w="full" h="56" objectFit="cover" borderRadius="lg" mb={6} />
                            <Heading as="h2" size="lg" mb={4} isTruncated className="font-sans text-blue-500">{course.ten}</Heading>
                            <Text fontSize="md" color="gray.600" noOfLines={3} mb={4} className="font-sans">{course.mota}</Text>

                            {hoveredCourse === course.id && (
                                <Box
                                    position="relative"
                                    w="full"
                                    bg="gray.800"
                                    color="white"
                                    shadow="lg"
                                    mt={4}
                                    p={6}
                                    borderRadius="lg"
                                    zIndex="10"
                                    display="block"
                                    transition="opacity 0.3s ease-in-out"
                                    borderWidth="1px"
                                    borderColor="blue.500" // Updated to blue border
                                >
                                    <Heading as="h3" size="md" mb={4} className="flex items-center font-sans text-blue-500">
                                        <FaBook className="mr-2" /> Khóa học theo lộ trình
                                    </Heading>
                                    <Grid templateColumns="1fr" gap={4}>
                                        {getSubCourses(course.id).map(subCourse => (
                                            <Box key={subCourse.id} p={4} borderWidth="1px" borderRadius="lg" bg="gray.700" borderColor="blue.500" _hover={{ bg: 'gray.600' }} shadow="sm">
                                                <Link href={`/page/course-detail?id=${subCourse.khoahoc.id}`} legacyBehavior>
                                                    <a>
                                                        <Image src={subCourse.khoahoc.hinh} alt={subCourse.khoahoc.ten} w="full" h="28" objectFit="cover" borderRadius="lg" />
                                                        <Heading as="h4" size="sm" mt={4} isTruncated className="font-sans text-blue-500">{subCourse.khoahoc.ten}</Heading>
                                                        <Text fontSize="xs" color="gray.300" noOfLines={2} className="font-sans">{subCourse.khoahoc.mota}</Text>
                                                    </a>
                                                </Link>
                                            </Box>
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Grid>
            </Flex>
        </Box>
    );
}