import React, { useState } from 'react';

const AddBanner = () => {
    const cloudName = 'dn7s1su66';
    const uploadPreset = 'my_unsigned_preset';
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        description: 'Mô tả Banner',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            // Check if image is a File object, indicating a new image upload
            let imageUrl = formData.image;
            if (formData.image instanceof File) {
                const imageFormData = new FormData();
                imageFormData.append("file", formData.image);
                imageFormData.append("upload_preset", uploadPreset);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: imageFormData,
                });
                const data = await response.json();
                imageUrl = data.secure_url;
            }

            const response = await fetch(`http://127.0.0.1:8000/admin-api/banner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    tieude: formData.title,
                    mota: formData.description,
                    hinh: imageUrl
                })
            });

            if (response.ok) {
                console.log('Banner created successfully');
            } else {
                console.error('Error creating banner:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <div className="text-white bg-gray-900">
            <section className="p-4">
                <h1 className="text-2xl font-semibold">Thêm biểu ngữ</h1>
                <p className="text-gray-400">thêmThôngTinBanner</p>
            </section>

            <section className="p-4 space-y-6">
                {['title', 'image', 'description'].map((field, idx) => (
                    <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                        <label className="block mb-2 text-sm font-semibold">
                            {field === 'title' ? 'Tiêu đề' : field === 'image' ? 'Hình' : 'Mô tả'}
                        </label>
                        {field === 'description' ? (
                            <textarea
                                name={field}
                                className="w-full p-2 text-white bg-gray-700 rounded-lg"
                                rows="4"
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type={field === 'image' ? 'file' : 'text'}
                                name={field}
                                className="w-full p-2 text-white bg-gray-700 rounded-lg"
                                value={field !== 'image' ? formData[field] : undefined}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
                <div className="flex justify-end">
                    <button
                        className="px-6 py-2 font-semibold text-black bg-green-500 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AddBanner;