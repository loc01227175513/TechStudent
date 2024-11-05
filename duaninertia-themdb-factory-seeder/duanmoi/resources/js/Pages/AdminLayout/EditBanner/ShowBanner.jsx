import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

const ShowBanner = () => {
    const [banners, setBanners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editableBanners, setEditableBanners] = useState({});
    const cloudName = 'dn7s1su66';
    const uploadPreset = 'my_unsigned_preset';

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin-api/Showbanner');
            const data = await response.json();
            setBanners(data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleInputChange = (id, field, value) => {
        setEditableBanners(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value
            }
        }));
    };

    const uploadImage = (id, file) => {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("upload_preset", uploadPreset);

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: imageFormData,
        })
            .then(response => response.json())
            .then(data => {
                setEditableBanners(prevState => ({
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        hinhanh: data.secure_url
                    }
                }));
            })
            .catch(err => console.error(err));
    };

    const handleSave = async (id) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const banner = banners.find(b => b.id === id);
        const { tieude, trangthai, hinhanh } = editableBanners[id] || {};

        try {
            // Check if hinhanh is a File object, indicating a new image upload
            let imageUrl = hinhanh;
            if (hinhanh instanceof File) {
                const imageFormData = new FormData();
                imageFormData.append("file", hinhanh);
                imageFormData.append("upload_preset", 'my_unsigned_preset');

                const response = await fetch(`https://api.cloudinary.com/v1_1/dn7s1su66/image/upload`, {
                    method: "POST",
                    body: imageFormData,
                });
                const data = await response.json();
                imageUrl = data.secure_url;
            }

            await fetch(`http://127.0.0.1:8000/admin-api/banner`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    id,
                    tieude: tieude !== undefined ? tieude : banner.tieude,
                    trangthai: trangthai !== undefined ? trangthai : banner.trangthai,
                    hinh: imageUrl !== undefined ? imageUrl : banner.hinh
                })
            });
            fetchBanners();
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    const filteredBanners = banners.filter(banner =>
        banner.id.toString().includes(searchTerm) || banner.tieude.includes(searchTerm)
    );

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <section className="p-6">
                <h1 className="text-3xl font-bold">Show Banner</h1>
            </section>
            <section className="p-6">
                <input
                    type="text"
                    placeholder="Search Banner code or title"
                    className="w-full p-3 text-white bg-gray-700 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </section>
            <Link href="/admin/ThemBanner">
                <section className="p-6">
                    <button className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Add</button>
                </section>
            </Link>
            <section className="p-6 space-y-6">
                {filteredBanners.map(banner => (
                    <BannerCard
                        key={banner.id}
                        banner={banner}
                        editableBanners={editableBanners}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        uploadImage={uploadImage}
                    />
                ))}
            </section>
        </div>
    );
};

const BannerCard = ({ banner, editableBanners, handleInputChange, handleSave, uploadImage }) => (
    <div className="p-6 bg-gray-800 border-2 border-gray-600 rounded-lg">
        <div className="flex items-center justify-between">
            <div className="flex w-3/4">
                <p className="mb-2 text-xl font-semibold">Mã biểu ngữ: {banner.id}</p>
                <textarea
                    className="w-full p-3 m-2 text-white bg-gray-700 rounded-lg"
                    value={editableBanners[banner.id]?.tieude || banner.tieude}
                    onChange={(e) => handleInputChange(banner.id, 'tieude', e.target.value)}
                />
                <select
                    onChange={(e) => handleInputChange(banner.id, 'trangthai', e.target.value)}
                    value={editableBanners[banner.id]?.trangthai || banner.trangthai}
                    className="w-20 p-2 m-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                    <option className='bg-black' value="2">Hiển Thị</option>
                    <option className='bg-black' value="1">Ẩn</option>
                </select>
                <div>
                    <img src={banner.hinh} alt="Banner image" className='p-2 m-2 rounded-full' style={{ width: '20%' }} />
                    <input
                        type="file"
                        className="p-2 m-2 text-white bg-gray-700 rounded-lg"
                        onChange={(e) => {
                            handleInputChange(banner.id, 'hinhanh', e.target.files[0]);
                            uploadImage(banner.id, e.target.files[0]);
                        }}
                    />
                </div>
            </div>
            <div className="space-x-2">
                <button
                    className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => handleSave(banner.id)}
                >
                    Save
                </button>
            </div>
        </div>
    </div>
);

export default ShowBanner;