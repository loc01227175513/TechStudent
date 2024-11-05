// cart.jsx
export const Addcart = async () => {
  const url = 'http://127.0.0.1:8000/api/addcart';
  const user = localStorage.getItem('data');

  if (!user) {
    return null;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');

  if (!id_khoahoc) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedUser.id,
        id_khoahoc: id_khoahoc,
      }),
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    return null;
  }
};

export const Showcart = async () => {
  const url = 'http://127.0.0.1:8000/api/showgiohang';
  const user = localStorage.getItem('data');

  if (!user) {
    return null;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedUser.id,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || !data.data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const KhoaHocDaDanKy = async () => {
  const url = 'http://127.0.0.1:8000/api/khoahocdadangky';
  const user = localStorage.getItem('data');

  if (!user) {
    return null;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    return null;
  }

  if (!parsedUser.id) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedUser.id,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || !data.data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};