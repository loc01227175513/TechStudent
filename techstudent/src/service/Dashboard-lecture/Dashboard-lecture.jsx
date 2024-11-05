export const Dashboard = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/kiemtragiangvien';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_nguoidung: parsedData.id })
    }); // Gọi API nội bộ

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}
export const GiangvienKhoaHoc = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/laykhoahocdanglam';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_giangvien: parsedLecturer.giangvien })
    }); // Gọi API nội bộ

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}
export const GiangvienKhoaHocDaMua = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/TongSoDangKy';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_giangvien: parsedLecturer.giangvien })
    }); // Gọi API nội bộ

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}
export const GiangvienDoanhThu = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/DoanhThuGiangVien';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_giangvien: parsedLecturer.giangvien })
    }); // Gọi API nội bộ

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}