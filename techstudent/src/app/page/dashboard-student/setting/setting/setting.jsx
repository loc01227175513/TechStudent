"use client";
import React, { useEffect, useState } from 'react';
import { updateUser, ShowUser, UpdatePassWord } from '../../../../../service/User/user';
import { MangXaHoiss, ShowMangXaHoi } from '../../../../../service/MangXaHoi/MangXaHoi';





const Profile = () => {
  const cloudName = 'dn7s1su66'; // Ensure this is your Cloudinary cloud name
  const uploadPreset = 'my_unsigned_preset'; // Ensure this is your Cloudinary upload preset

  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    dienthoai: '',
    hinh: null,
  });
  const [imageSelected, setImageSelected] = useState(null);

  const uploadImage = async () => {
    const imageFormData = new FormData();
    imageFormData.append("file", imageSelected);
    imageFormData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: imageFormData,
      });
      const data = await response.json();
      setFormData(prevFormData => ({
        ...prevFormData,
        hinh: data.secure_url
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await ShowUser(); 
      console.log(userData);
      setFormData({
        ten: userData.data.ten || '',
        email: userData.data.email || '',
        dienthoai: userData.data.dienthoai || '',
        hinh: userData.data.hinh || null,
      });
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = async (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setImageSelected(files[0]);
      await uploadImage();
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      alert('Thông tin đã được cập nhật thành công');
    } catch (error) {
      alert('Cập nhật thông tin thất bại');
      console.error(error);
    }
  };

  return (
    <div className="profile-form">
      <h3>Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ten">Tên</label>
          <input type="text" id="ten" placeholder="Nhập tên của bạn" value={formData.ten} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Nhập email của bạn" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dienthoai">Điện thoại</label>
          <input type="text" id="dienthoai" placeholder="Nhập số điện thoại của bạn" value={formData.dienthoai} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hinh">Hình</label>
          <input type="file" id="hinh" onChange={handleChange} />
          {formData.hinh && <img src={formData.hinh} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
        </div>
        <button type="submit" className="rts-btn btn-primary">Cập nhật thông tin</button>
      </form>
    </div>
  );
};


const MangXaHoi = () => {
  const [ShowMangXaHoi1, setMangXaHoi] = useState({ facebook: '', skype: '', linkedin: '', pinterest: '', github: '' });

  useEffect(() => {
    ShowMangXaHoi()
      .then((data) => {
        const transformedData = data.data.reduce((acc, item) => {
          acc[item.nentang] = item.url;
          return acc;
        }, {});
        setMangXaHoi(transformedData);
      })
      .catch((error) => {
        console.error('Failed to fetch social profile data:', error);
      });
  }, []);

  const [formData, setFormData] = useState({
    facebook: '',
    skype: '',
    linkedin: '',
    pinterest: '',
    github: ''
  });

  useEffect(() => {
    if (ShowMangXaHoi1) {
      setFormData({
        facebook: ShowMangXaHoi1.facebook || '',
        skype: ShowMangXaHoi1.skype || '',
        linkedin: ShowMangXaHoi1.linkedin || '',
        pinterest: ShowMangXaHoi1.pinterest || '',
        github: ShowMangXaHoi1.github || ''
      });
    }
  }, [ShowMangXaHoi1]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const platforms = ['facebook', 'skype', 'linkedin', 'pinterest', 'github'];
      const updatePromises = platforms
        .filter(platform => formData[platform])  // Filter out empty URLs
        .map(platform => MangXaHoiss({
          nentang: platform,
          url: formData[platform]
        }));

      // Update social profile data on form submission
      await Promise.all(updatePromises);
      alert('Social profile links have been successfully updated');
    } catch (error) {
      alert('Failed to update social profile links');
      console.error(error);
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="social-profile-link-wrapper">
        <h5 className="title">Social Profile Link</h5>

        <form onSubmit={handleSubmit}>
          <div className="single-profile-wrapper">
            <div className="left">
              <div className="icon">
                <i className="fa-brands fa-facebook-f" />
                <span>Facebook</span>
              </div>
            </div>
            <div className="right">
              <input
                type="text"
                id="facebook"
                placeholder="https://www.facebook.com/username"
                onChange={handleChange}
                value={formData.facebook}
              />
            </div>
          </div>
          <div className="single-profile-wrapper">
            <div className="left">
              <div className="icon">
                <i className="fa-brands fa-skype" />
                <span>Skype</span>
              </div>
            </div>
            <div className="right">
              <input
                type="text"
                id="skype"
                placeholder="https://www.skype.com/username"
                onChange={handleChange}
                value={formData.skype}
              />
            </div>
          </div>
          <div className="single-profile-wrapper">
            <div className="left">
              <div className="icon">
                <i className="fa-brands fa-linkedin" />
                <span>LinkedIn</span>
              </div>
            </div>
            <div className="right">
              <input
                type="text"
                id="linkedin"
                placeholder="https://www.linkedin.com/username"
                onChange={handleChange}
                value={formData.linkedin}
              />
            </div>
          </div>
          <div className="single-profile-wrapper">
            <div className="left">
              <div className="icon">
                <i className="fa-brands fa-pinterest" />
                <span>Pinterest</span>
              </div>
            </div>
            <div className="right">
              <input
                type="text"
                id="pinterest"
                placeholder="https://www.pinterest.com/username"
                onChange={handleChange}
                value={formData.pinterest}
              />
            </div>
          </div>
          <div className="single-profile-wrapper">
            <div className="left">
              <div className="icon">
                <i className="fa-brands fa-github" />
                <span>Github</span>
              </div>
            </div>
            <div className="right">
              <input
                type="text"
                id="github"
                placeholder="https://www.github.com/username"
                onChange={handleChange}
                value={formData.github}
              />
            </div>
          </div>
          <button type="submit" className="rts-btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};






const Password = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      alert('New password and confirmation do not match');
      return;
    }
    try {
      await UpdatePassWord(formData);
      alert('Password has been successfully reset');
    } catch (error) {
      alert('Failed to reset password');
      console.error(error);
    }
  };

  return (
    <div className="setting-change-password-area">
      <form onSubmit={handleSubmit} className="form-password-area">
        <div className="single-input">
          <label htmlFor="old_password">Current Password</label>
          <input
            id="old_password"
            type="password"
            placeholder="Current Password"
            value={formData.old_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="single-input">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="single-input">
          <label htmlFor="password_confirmation">Re-type New Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Re-type New Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="rts-btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};




export { Profile, Password, MangXaHoi };