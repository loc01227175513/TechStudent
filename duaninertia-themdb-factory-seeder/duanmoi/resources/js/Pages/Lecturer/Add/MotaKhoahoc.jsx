import React, { useState, useEffect } from "react";
import Axios from "axios";

function MotaKhoahoc({ id }) {
    const [motaIds, setMotaIds] = useState([]);
    const [hocSinhInputs, setHocSinhInputs] = useState([""]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        if (id) {
            localStorage.setItem("id_khoahoc", id);
        }
    }, [id]);

    const fetchMoTa = async () => {
        try {
            const response = await Axios.get(`/api/motaKhoaHoc/${id}`);
            const data = response.data;
            console.log("API response data:", data); // Log API response

            const ids = data.data.flatMap((item, index) => {
                try {
                    const parsedMota = JSON.parse(item.muctieu);
                    if (Array.isArray(parsedMota)) {
                        return parsedMota.map((_, i) => index * 100 + i); // Generate unique ids
                    } else {
                        console.error("Parsed mota is not an array:", parsedMota);
                        return [];
                    }
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    return [];
                }
            });

            setMotaIds(ids);
            console.log("Fetched motaIds:", ids); // Log fetched ids

            const tenValues = data.data.flatMap((item) => {
                try {
                    const parsedMota = JSON.parse(item.muctieu);
                    if (Array.isArray(parsedMota)) {
                        return parsedMota;
                    } else {
                        console.error("Parsed mota is not an array:", parsedMota);
                        return [];
                    }
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    return [];
                }
            });

            setHocSinhInputs(tenValues.length > 0 ? tenValues : [""]);
            console.log("Fetched hocSinhInputs:", tenValues); // Log fetched inputs
        } catch (error) {
            console.error("Error fetching course description:", error);
        }
    };

    useEffect(() => {
        fetchMoTa();
    }, [id]);

    const handleInputChange = (index, setState, state, value) => {
        const newInputs = [...state];
        newInputs[index] = value;
        setState(newInputs);
    };

    const handleAddInput = (state, setState) => {
        if (state.every((input) => input.trim() !== "")) {
            setState([...state, ""]);
        }
    };

    const handleSubmit = async () => {
        const hocSinhValues = hocSinhInputs.filter((input) => input.trim() !== "");

        try {
            await Axios.post("/api/updateMota", {
                id_khoahoc: id,
                mota: hocSinhValues,
            });
            alert("Mô tả khóa học đã được gửi thành công");
        } catch (error) {
            console.error("Error submitting course description:", error);
        }
    };

    const handleDelete = async (index, state, setState, ids, setIds, id) => {
        const newInputs = [...state];

        if (newInputs.length > 1) {
            const idmota = motaIds[index]; // Use correct idmota from motaIds
            if (idmota === undefined) {
                console.error("idmota is undefined for index:", index);
                console.log("Current motaIds:", motaIds); // Log current motaIds
                console.log("Current hocSinhInputs:", hocSinhInputs); // Log current hocSinhInputs
                return;
            }

            try {
                console.log("Request data:", { idmota: idmota, id_khoahoc: id }); // Log request data
                const response = await Axios.post("/api/xoamota", {
                    idmota: idmota,
                    id_khoahoc: id,
                });

                console.log("Delete response:", response);

                newInputs.splice(index, 1);
                setState(newInputs);

                const newIds = [...ids];
                newIds.splice(index, 1);
                setIds(newIds);

                alert("Mô tả đã được xóa thành công");
                window.location.reload(); // Reload the page
            } catch (error) {
                console.error("Error deleting description:", error);
                console.error("Request data:", {
                    idmota: idmota,
                    id_khoahoc: id,
                });
                alert("Có lỗi xảy ra khi xóa mô tả");
            }
        } else {
            setState([""]);
        }
    };

    return (
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-sm">
            <h1 className="mb-6 text-3xl font-bold">Người học dự định</h1>
            <p className="mb-8 text-lg text-gray-700">
                Các mô tả sau đây sẽ hiển thị công khai trên Trang đích khóa học của
                bạn và sẽ có tác động trực tiếp đến hiệu suất khóa học của bạn. Các mô
                tả này sẽ giúp người học quyết định xem khóa học của bạn có phù hợp với
                họ không.
            </p>

            <div className="space-y-8">
                <div>
                    <label className="block mb-4 text-xl font-semibold">
                        Học sinh sẽ học được gì trong khóa học của bạn?
                    </label>
                    {hocSinhInputs.map((input, index) => (
                        <div
                            key={index}
                            className="relative mb-4"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <input
                                type="text"
                                className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded"
                                placeholder="Ví dụ: Xác định vai trò và trách nhiệm của người quản lý dự án"
                                value={input}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        setHocSinhInputs,
                                        hocSinhInputs,
                                        e.target.value
                                    )
                                }
                            />
                            {hoveredIndex === index && (
                                <button
                                    className="absolute text-red-500 right-3 top-3 hover:text-red-700"
                                    onClick={() =>
                                        handleDelete(
                                            index,
                                            hocSinhInputs,
                                            setHocSinhInputs,
                                            motaIds,
                                            setMotaIds,
                                            id
                                        )
                                    }
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="mt-6">
                        <button
                            onClick={() => handleAddInput(hocSinhInputs, setHocSinhInputs)}
                            className="px-6 py-3 font-semibold text-white bg-purple-600 rounded hover:bg-purple-700"
                        >
                            Thêm nội dung
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Gửi mô tả khóa học
                </button>
            </div>
        </div>
    );
}

export default MotaKhoahoc;