// VoucherShop.jsx
import { useEffect, useState } from "react";
import {
    Box,
    Image,
    Badge,
    Text,
    Button,
    HStack,
    useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TatCaKhuyenMaiKhoaHoc, NguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';


const MotionBox = motion(Box);

function VoucherCard({ maso, giamgia, gia, trangthai, hinh, onSave, isSaved }) {
    const bgColor = useColorModeValue("white", "gray.800");
    const brandBg = useColorModeValue("#fff7e6", "gray.700");

    return (
        <MotionBox
            maxW="300px"
            w="100%"
            borderRadius="md"
            overflow="hidden"
            whileHover={{ scale: 1.05 }}
            transition="0.2s"
            boxShadow="md"
        >
            <HStack bg={bgColor} spacing={0} align="stretch">
                <Box
                    p={3}
                    bg={brandBg}
                    w={{ base: "100%", sm: "40%" }}
                    minH={{ base: "80px", sm: "auto" }}
                    borderRightWidth={{ base: 0, sm: "1px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image
                        src={hinh}
                        alt={hinh}
                        maxH="70px"
                        objectFit="contain"
                    />
                </Box>
                <Box p={3} w={{ base: "100%", sm: "60%" }}>
                    {trangthai === "Đã Duyệt" && (
                        <Badge colorScheme="red" mb={1} fontSize="xs">
                            {maso}
                        </Badge>
                    )}
                    <Text
                        color="red.500"
                        fontSize={{ base: "16px", md: "18px" }}
                        fontWeight="bold"
                        mb={1}
                    >
                        Giảm {giamgia}%
                    </Text>
                    <Text
                        color="gray.500"
                        fontSize="xs"
                        mb={1}
                    >
                        Đơn Tối Thiểu ₫{gia}
                    </Text>
                    <HStack justify="space-between">
                        <Text
                            color="blue.500"
                            fontSize="xs"
                        >
                            Điều Kiện
                        </Text>
                        <Button
                            size="xs"
                            colorScheme={isSaved ? "gray" : "red"}
                            onClick={() => onSave(maso)}
                            className="bg-red-300 text-white"
                            isDisabled={isSaved}
                            _hover={{
                                transform: "translateY(-2px)",
                                shadow: "md"
                            }}
                        >
                            <i className={`bi ${isSaved ? "bi-check-circle" : "bi-save"}`} style={{ marginRight: '4px' }}></i>
                            {isSaved ? "Đã Lưu" : "Lưu"}
                        </Button>
                    </HStack>
                </Box>
            </HStack>
        </MotionBox>
    );
}

export default function VoucherShop() {
    const [savedVouchers, setSavedVouchers] = useState([]);
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const [KhuyenMai, setKhuyenMai] = useState([]);
    const userId = 1; // Replace with actual user ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TatCaKhuyenMaiKhoaHoc();
                setKhuyenMai(response);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            }
        };
        fetchData();
    }, []);

    const handleSave = async (maso) => {
        try {
            const selectedCoupon = KhuyenMai.find(item => item.magiamgia.maso === maso);
            if (selectedCoupon) {
                await NguoiDungMaGiamGia({
                    id_magiamgia: selectedCoupon.magiamgia.id
                });
                setSavedVouchers((prev) => [...prev, maso]);
                toast.success("Voucher saved successfully!");
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error("Failed to save voucher.");
        }
    };
    
    return (
        <div className="container-fluid bg-light py-4">
            <ToastContainer />
            <div className="container">
                <div className="text-center mb-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-danger">Ưu đãi hấp dẫn</h2>
                    </motion.div>
                    <p className="text-muted mt-2">
                        Số lượng có hạn, dành cho những bạn nhanh nhất
                    </p>
                </div>

                <div className="row">
                    {KhuyenMai.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: item.id * 0.1 }}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        >
                            <VoucherCard
                                maso={item.magiamgia.maso}
                                giamgia={item.khoahoc.giamgia}
                                gia={item.khoahoc.gia}
                                hinh={item.khoahoc.hinh}
                                trangthai={item.magiamgia.trangthai}
                                onSave={handleSave}
                                isSaved={savedVouchers.includes(item.magiamgia.maso)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}