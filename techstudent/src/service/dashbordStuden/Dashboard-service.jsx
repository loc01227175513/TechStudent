export const Dashboard = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/khoahocdadangky';

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
export const KhoaHocDaHoc = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/KhoaHocDaHoc';

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
export const KhoaHocDangHoc = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/khoahocdanghoc';

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
export const KhoaHocDaHoanThanh = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/KhoaHocDaHoc ';
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