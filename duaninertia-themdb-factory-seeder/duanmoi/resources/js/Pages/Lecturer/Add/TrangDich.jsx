import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrangDich() {
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTopics, setFilteredTopics] = useState([]);
    const userData = localStorage.getItem('lecturerId');
    const parsedData = JSON.parse(userData);
    const khoahocData = localStorage.getItem('id_khoahoc');
    const khoahocparsedData = JSON.parse(khoahocData);
    const cloudName = 'dn7s1su66';
    const uploadPreset = 'my_unsigned_preset';

    const [formData, setFormData] = useState({
        ten: '',
        hinh: '',
        id_khoahoc: khoahocparsedData,
        id_chude: '',
        id_theloaicon: '',
        id_theloai: '',
        trinhdo: '',
        mota: '',
        id_giangvien: parsedData.giangvien,
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.post('/api/ShowTrangDichKhoaHoc', { id_khoahoc: khoahocparsedData });
                const data = response.data;
                setFormData({
                    ten: data.khoahoc.ten,
                    id_khoahoc: data.khoahoc.id,
                    id_theloai: data.theloai.id,
                    id_theloaicon: data.theloaicon.id,
                    id_chude: data.chude.id,
                    mota: data.khoahoc.mota,
                    trinhdo: data.trinhdo.ten,
                    id_giangvien: parsedData.giangvien,
                    hinh: data.khoahoc.hinh,
                });
                setImageUrl(data.khoahoc.hinh); // Display image if available
            } catch (error) {
                console.error("Error fetching course data: ", error);
            }
        };

        fetchCourseData();
    }, []);

    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    useEffect(() => {
        axios.get('api/theloai')
            .then(response => {
                setCategories(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory('');
        setFormData({
            ...formData,
            id_theloai: e.target.value,
            id_theloaicon: ''
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredTopics([]);
        } else {
            const allTopics = categories.flatMap(cat => cat.theloaicons.flatMap(subCat => subCat.chudes));
            const filtered = allTopics.filter(topic => topic.ten.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredTopics(filtered);
        }
    };

    const handleTopicClick = (topicName, topicId) => {
        setSearchTerm(topicName);
        setFilteredTopics([]);
        setFormData({
            ...formData,
            id_chude: topicId
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageSelected(file);
    };

    const uploadImage = () => {
        const imageFormData = new FormData();
        imageFormData.append("file", imageSelected);
        imageFormData.append("upload_preset", uploadPreset);

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: imageFormData,
        })
            .then(response => response.json())
            .then(data => {
                setImageUrl(data.secure_url);
                // Update formData with the image URL after successful upload
                setFormData(prevFormData => ({
                    ...prevFormData,
                    hinh: data.secure_url
                }));
                setIsImageUploaded(true);
            })
            .catch(err => console.error(err));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isImageUploaded) {
            alert("Please upload the image first.");
            return;
        }

        // Create a new FormData object to submit
        const submitData = new FormData();

        // Add all fields from formData (state) to submitData
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        // Send data to API
        axios.post('api/TrangDichKhoaHoc', submitData)
            .then(response => {
                console.log(response.data);
                // Handle success
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
                // Handle error
            });
    };


    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
            <h1 className="mb-6 text-2xl font-bold text-red-500">
                Course Landing Page
            </h1>
            <p className="mb-6 text-gray-700">
                Your course landing page is crucial to your success on Udemy. If it's done right, it can also help you gain visibility in search engines like Google.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course Title</label>
                    <input
                        type="text"
                        name="ten"
                        className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your course title"
                        value={formData.ten}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả khóa học</label>
                    <textarea
                        name="mota"
                        className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your course description"
                        value={formData.mota}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Level</label>
                        <select
                            name="trinhdo"
                            className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={formData.trinhdo}
                            onChange={handleInputChange}
                        >
                            <option value="-1">-- Chọn cấp độ --</option>
                            <option value="Trình độ sơ cấp">Beginner Level</option>
                            <option value="Trình độ trung cấp">Intermediate Level</option>
                            <option value="Cấp độ chuyên gia">Expert Level</option>
                            <option value="Tất cả các cấp độ">All Levels</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="id_theloai"
                            className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={category}
                            onChange={handleCategoryChange}
                        >     <option value="">-- Chọn mục thể loại --</option>
                            {categories
                                .filter(cat => cat.theloaicons && cat.theloaicons.length > 0)
                                .map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.ten}</option>
                                ))
                            }
                        </select>

                    </div>
                </div>

                {category && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Chọn chuyên ngành</label>
                        <select
                            name="id_theloaicon"
                            className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={subCategory}
                            onChange={(e) => {
                                setSubCategory(e.target.value);
                                setFormData({
                                    ...formData,
                                    id_theloaicon: e.target.value
                                });
                            }}
                        >
                            <option value="">-- Chọn chuyên ngành --</option>
                            {categories.find(cat => cat.id === parseInt(category))?.theloaicons.map(subCat => (
                                <option key={subCat.id} value={subCat.id}>{subCat.ten}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Search Topics</label>
                    <input
                        type="text"
                        className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Search for topics"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {searchTerm && filteredTopics.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Filtered Topics</label>
                        <ul className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md">
                            {filteredTopics.map(topic => (
                                <li key={topic.id} onClick={() => handleTopicClick(topic.ten, topic.id)} className="p-1 cursor-pointer hover:bg-gray-100">
                                    {topic.ten}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload File</label>
                    <input
                        type="file"
                        name="hinh"
                        className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        onChange={handleFileChange}
                    />
                    <button type="button" onClick={uploadImage} className="px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Upload Image
                    </button>
                    {imageUrl && (
                        <div className="mt-2">
                            <img src={imageUrl} alt="Uploaded" className="w-full h-auto rounded-md shadow-sm" />
                        </div>
                    )}
                </div>

                <div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TrangDich;
