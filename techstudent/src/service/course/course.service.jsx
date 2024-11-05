


// https://httpbin.org/get



export const Allcoursesss = async () => {
  const url = 'http://127.0.0.1:8000/api/allkhoahoc';

  try {
    const response = await fetch(url); // Gọi API nội bộ
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Re-throw the error after logging it
  }
};



export const CourseDetails = async (id) => {
  const url = `http://127.0.0.1:8000/api/Khoahocchitiet/${id}`;
  const response = await fetch(`${url}`); // Gọi API nội bộ
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}
export const ThemKhoaHocDaHoc = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');
console.log("id_khoahoc",id_khoahoc);
  const user = localStorage.getItem('data');
  const userJson = JSON.parse(user);


  if (!id_khoahoc) {
    throw new Error('Course ID not found in URL');
  }

  const url = `http://127.0.0.1:8000/api/ThemKhoaHocDaHoc`;

  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_khoahoc: id_khoahoc,
        id_nguoidung :userJson.id,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch certificate: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const GiangVienKhoaHocHienThi = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');
  const url = `http://127.0.0.1:8000/api/GiangVienKhoaHocHienThi/${id_khoahoc}`;
  const response = await fetch(`${url}`); // Gọi API nội bộ
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}