export const KhoaHocYeuThich = async (id) => {
    const url = 'http://127.0.0.1:8000/api/addKhoaHocYeuThich';
    const userData = localStorage.getItem('data');

    if (!userData) {
        throw new Error('No user data found');
    }

    let parsedUser;
    try {
        parsedUser = JSON.parse(userData);
    } catch (error) {
        throw new Error('Invalid user data');
    }

    if (!id) {
        throw new Error('No course ID provided');
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_khoahoc: id,
            id_nguoidung: parsedUser.id,
        })
    });

    if (!response.ok) {
        throw new Error('Failed to add favorite course');
    }
    return response.json();
};
export const DanhSachYeuThich = async () => {
    const userData = localStorage.getItem('data');
    const parsedLecturer = JSON.parse(userData);
    const url = 'http://127.0.0.1:8000/api/showKhoaHocYeuThich'
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
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}
export const XoaKhoaHocYeuThich = async (id) => {
    const url = `http://127.0.0.1:8000/api/deleteKhoaHocYeuThich/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to unfollow lecturer');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };