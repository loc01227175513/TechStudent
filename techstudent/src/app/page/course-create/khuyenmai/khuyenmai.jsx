
"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Button,
  extendTheme,
  ChakraProvider,
  Input,
  Select
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TatCaKhuyenMai, AddKhuyenMaiKhoaHoc } from "../../../../service/khuyenmai/khuyenmai";
import { ToastContainer, toast } from 'react-toastify';

const MotionBox = motion(Box);

const theme = extendTheme({
  colors: {
    primary: 'rgb(50, 173, 230)',
  },
});

const initializeLocalStorage = () => {
  const existingData = localStorage.getItem('data');
  if (!existingData) {
    const defaultData = {
      giangvien: {
        id: 1,
        name: 'Default Giangvien',
      },
    };
    localStorage.setItem('data', JSON.stringify(defaultData));
  }

  const existingDataForm = localStorage.getItem('dataForm');
  if (!existingDataForm) {
    const defaultDataForm = {
      id_magiamgia: null,
    };
    localStorage.setItem('dataForm', JSON.stringify(defaultDataForm));
  }
};

const CouponForm = () => {
  const [data, setData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountFilter, setDiscountFilter] = useState('');
  const [userCountFilter, setUserCountFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [bestPromotionFilter, setBestPromotionFilter] = useState(false);

  useEffect(() => {
    initializeLocalStorage();
    const fetchData = async () => {
      try {
        const response = await TatCaKhuyenMai();
        setData(response);
      } catch (error) {
        toast.error('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (couponId) => {
    setSelectedCoupon(prev => (prev === couponId ? null : couponId));
  };

  const handlePublicClick = async () => {
    if (selectedCoupon) {
      try {
        // Update dataForm in localStorage with the selectedCoupon
        const dataForm = JSON.parse(localStorage.getItem('dataForm')) || {};
        dataForm.id_magiamgia = selectedCoupon;
        localStorage.setItem('dataForm', JSON.stringify(dataForm));

        // Call the API to add the coupon
        await AddKhuyenMaiKhoaHoc(selectedCoupon);
        toast.success('Coupon ID sent successfully!');
      } catch (error) {
        toast.error('Error sending coupon ID.');
      }
    } else {
      toast.info('No coupon selected.');
    }
  };

  const filteredData = data.filter(coupon => {
    const isBestPromotion = bestPromotionFilter ? coupon.giamgia >= 50 : true;
    return (
      (discountFilter === '' || coupon.giamgia >= discountFilter) &&
      (userCountFilter === '' || coupon.luotsudung >= userCountFilter) &&
      (dateFilter === '' ||
        (new Date(coupon.ngaybatdau) <= new Date(dateFilter) &&
          new Date(coupon.ngayketthuc) >= new Date(dateFilter))) &&
      isBestPromotion
    );
  });

  return (
    <ChakraProvider theme={theme}>
      <Container
        maxW="full"
        height="100vh"
        py={8}
        bg="gray.50"
        position="relative"
        overflowY="auto"
      >
        <Heading as="h2" size="lg" mb={6} color="primary" textAlign="center">
          Danh sách Mã Giảm Giá Khóa Học
        </Heading>
        <Box mb={6} px={4}>
          <Select
            placeholder="Filter by discount percentage"
            value={discountFilter}
            onChange={(e) => setDiscountFilter(e.target.value)}
            mb={4}
          >
            <option value="">All</option>
            <option value="10">10% or more</option>
            <option value="20">20% or more</option>
            <option value="30">30% or more</option>
          </Select>
          <Select
            placeholder="Filter by user count"
            value={userCountFilter}
            onChange={(e) => setUserCountFilter(e.target.value)}
            mb={4}
          >
            <option value="">All</option>
            <option value="100">100 or more</option>
            <option value="200">200 or more</option>
            <option value="300">300 or more</option>
          </Select>
          <Input
            type="date"
            placeholder="Filter by date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            mb={4}
          />
          <Checkbox
            isChecked={bestPromotionFilter}
            onChange={(e) => setBestPromotionFilter(e.target.checked)}
            mb={4}
          >
            Chỉ hiển thị khuyến mãi tốt nhất (&gt;= 50%)
          </Checkbox>
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} px={4}>
          {filteredData.map((coupon) => (
            <MotionBox
              key={coupon.id}
              bg="white"
              shadow="lg"
              rounded="xl"
              p={4}
              position="relative"
              onClick={() => handleCardClick(coupon.id)}
              cursor="pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              border="2px solid gray"
            >
              {selectedCoupon === coupon.id && (
                <Box
                  as="i"
                  className="bi bi-check-circle-fill"
                  position="absolute"
                  top={4}
                  right={2}
                  color="green.500"
                  fontSize="32px"
                />
              )}
              <Box mt={4} color="gray.800">
                <Text fontWeight="bold" fontSize="md">
                  <i
                    className={`bi ${selectedCoupon === coupon.id ? 'bi-tag-fill' : 'bi-tag'}`}
                    style={{ marginRight: '8px' }}
                  />
                  Mã số: {coupon.maso}
                </Text>
                <Text fontSize="md">
                  <i className="bi bi-percent" style={{ marginRight: '8px' }} />
                  Giảm giá: {coupon.giamgia}%
                </Text>
                <Text fontSize="md">
                  <i className="bi bi-people" style={{ marginRight: '8px' }} />
                  Lượt sử dụng: {coupon.luotsudung}
                </Text>
                <Text fontSize="md">
                  <i className="bi bi-person-check" style={{ marginRight: '8px' }} />
                  Sử dụng hiện tại: {coupon.sudunghientai}
                </Text>
                <Text fontSize="md">
                  <i className="bi bi-calendar-event" style={{ marginRight: '8px' }} />
                  Ngày bắt đầu: {coupon.ngaybatdau}
                </Text>
                <Text fontSize="md">
                  <i className="bi bi-calendar-x" style={{ marginRight: '8px' }} />
                  Ngày kết thúc: {coupon.ngayketthuc}
                </Text>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
        <Box textAlign="center" mt={6}>
          <Button colorScheme="blue" onClick={handlePublicClick}>
            Public
          </Button>
        </Box>
      </Container>
      <ToastContainer />
    </ChakraProvider>
  );
};

export default CouponForm;