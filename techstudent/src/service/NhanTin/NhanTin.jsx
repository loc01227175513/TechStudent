export const DanhSachTinNhan = async () => {
    const userData = localStorage.getItem('data');
    if (!userData) {
        throw new Error('No user data found');
    }
    let parsedLecturer;
    try {
        parsedLecturer = JSON.parse(userData);
    } catch (error) {
        throw new Error('Invalid user data');
    }
    const url = 'http://127.0.0.1:8000/api/showAllNhanTin';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_nguoidung: parsedLecturer.id,
        })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }
    return response.json();
}
export const NguoiDungTinNhan = async () => {
    const userData = localStorage.getItem('data');
    if (!userData) {
        throw new Error('No user data found');
    }
    let parsedLecturer;
    try {
        parsedLecturer = JSON.parse(userData);
    } catch (error) {
        throw new Error('Invalid user data');
    }
    const url = 'http://127.0.0.1:8000/api/laynguoidung';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_nguoidung: parsedLecturer.id,
        })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }
    return response.json();
}
export const showGiangVien = async () => {
 

    try {
    } catch (error) {
        throw new Error('Invalid user data');
    }
    const url = `http://127.0.0.1:8000/api/giangvien`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch lecturers');
    }
    return response.json();
}




export const DanhSachTinNhanGiangVien = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/showAllNhanTinGiangVien';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_giangvien: parsedLecturer.giangvien,
            })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    } catch (error) {
        throw new Error('Network error');
    }
}
export const ShowAllNguoiDung = async () => {
    const url = 'http://127.0.0.1:8000/api/showAllNguoiDung';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    } catch (error) {
        throw new Error('Network error');
    }
}
export const GiangVienHientai = async () => {
    const userData = localStorage.getItem('lecturerId');
    if (!userData) {
        throw new Error('No lecturer ID found in localStorage');
    }

    let parsedLecturer;
    try {
        parsedLecturer = JSON.parse(userData);
    } catch (error) {
        throw new Error('Failed to parse lecturer data');
    }

    const url = 'http://127.0.0.1:8000/api/giangVienHientai';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_giangvien: parsedLecturer.giangvien,
        })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch current lecturer data');
    }
    return response.json();
}