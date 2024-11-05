export const Lecture = async () => {
    const url = 'http://127.0.0.1:8000/api/khoahocbanduocgiangvien';

    // Retrieve data from local storage
    const data = JSON.parse(localStorage.getItem('data'));

    if (!data || !data.id) {
        throw new Error('No valid data found in local storage');
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_nguoidung: data.id }), // Ensure the body is an object
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};
export const GiangVienHienTai = async () => {
    const url = 'http://127.0.0.1:8000/api/giangvienhientai';

    // Retrieve data from local storage
    const data = JSON.parse(localStorage.getItem('lecturerId'));

    if (!data || !data.giangvien) {
        throw new Error('No valid data found in local storage');
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_giangvien: data.giangvien }), // Ensure the body is an object
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};
export const TatCaGiangVien = async () => {
    const url = 'http://127.0.0.1:8000/api/giangvien';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};