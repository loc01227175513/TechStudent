"use client"

import React, {  useState }  from 'react';
// import Footercomponent from "@/app/component/footer/footer";
import './page.css';
export default function Lesson(){
    const [rating,setRating] = useState(0);
    const handleClickStart=(index) =>{
        setRating(index + 1);
    }

    return(
        <div>
            <div className="flex justify-between px-2 header" >
                <div className="flex">
                     <p>techstudent@gmail.com</p>
                     <p>+123 456 789</p>
                </div>
                <div className="flex">
                    <p>English</p>
                    <p>Usd</p>
                </div>
            </div>
            <div className="grid grid-cols-[70%_30%] mt-8 items-end">
                <div className=''>
                    <div>
                   <a href={'/'}>
                   <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727967044/z5893902778330_3f5bed4df0f1d220b06d64708c4d87fc_rfjfty.jpg" 
                className="w-72 hover:cursor-pointer"
                alt="logo" />
                   </a>
                    </div>
                    
                <div className="detail-lesson overflow-y-scroll ">
                    {/* video khóa học */}

                    <div>
                    <iframe
                        height="500px"
                        src="https://www.youtube.com/embed/fPL3-cODrVU?si=8Nz05i6TzsiG7WpY"
                        title="YouTube video player"
                        frameBorder="0"  // Thay đổi ở đây
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"  // Thay đổi ở đây
                        allowFullScreen  // Thay đổi ở đây
                        >

                    </iframe>

                    </div>
                    {/* kết thúc video khóa học */}

                    {/* thanh next và prev */}
                    <div className="flex justify-between m-8">
                        <div>
                        <i className="bi bi-chevron-left"></i> trước

                        </div>
                        <div>
                        tiếp theo<i className="bi bi-chevron-right"></i> 

                        </div>
                    </div>
                    {/* kết thúc next và prev */}

                    {/* thông tin giảng viên */}
                    <div className="m-4 title-lesson">
                        <div className="flex items-center gap-2 mb-3">
                        <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727111263/test/eidtlp8jtafefmgr3byp.jpg" alt="" 
                        className="w-16 h-16 rounded-full"
                        />
                        <p>name giảng viên</p>
                        </div>
                        <div className="border-t">
                        <h6>Bài 1: anaskb áukh kjash ákgj </h6>
                        <p>   If filmmaking is your passion but you never went to film school you’ve come to the right place. Here, you will get hands-on experience and acquire skills that you never would’ve 
                        elsewhere like learning how to make feature films on your own, making do with any equipment, and doing it all faster and better.</p>
                        </div>
                    </div>
                    {/* kết thúc thông tin giảng viên */}
                    {/* form điền bình luận */}
                    <div>
                        <form className="vietbinhluan">
                            <textarea name="" id="" placeholder="viết bình luận"></textarea>
                                <div className="ml-5">
                                    <ul className="flex">
                                        {Array.from({length:5} , (_,index)=>(
                                            <li key={index} onClick={() =>   handleClickStart(index)}>
                                                {/* <p>{index}</p>
                                                <p>{rating}</p> */}
                                             <i className={`fa-sharp ${index < rating ? 'fa-solid' : 'fa-regular'} fa-star`} />
                                         </li>
                                        ))}
                                   
                                     </ul>
                                </div>
                        </form>
                    </div>
                    {/* kết thúc form điền bình luận */}

                    <div className="grid grid-cols-[40%_60%]">
                       <div className="border">
                        <h3 className="ml-6">bình luận về khóa học</h3>
                        {/* bình luận */}
                       <div className="binhluan m-4">
                           <div className="p-2">
                           <div className="flex items-center gap-2 ">
                                <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727111263/test/eidtlp8jtafefmgr3byp.jpg" alt="" 
                                className="w-14 h-14 rounded-full"
                                />
                               <div>
                               <p>name</p>
                               <div className=" px-1 chucvu">
                               <p> học viên</p>
                               </div>
                               </div>
                            </div>
                            <div>
                                <p>bài này hay quá mọi người ơi</p>
                            </div>
                            <div>
                            <ul className="flex">
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-regular fa-star" />
                                </li>
                            </ul>
                            </div>
                           </div>
                        </div>
                        <div className="binhluan m-4">
                           <div className="p-2">
                           <div className="flex items-center gap-2 ">
                                <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727111263/test/eidtlp8jtafefmgr3byp.jpg" alt="" 
                                className="w-14 h-14 rounded-full"
                                />
                               <div>
                               <p>name</p>
                               <div className=" px-1 chucvu">
                               <p> học viên</p>
                               </div>
                               </div>
                            </div>
                            <div>
                                <p>bài này hay quá mọi người ơi</p>
                            </div>
                            <div>
                            <ul className="flex">
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-regular fa-star" />
                                </li>
                            </ul>
                            </div>
                           </div>
                        </div>
                        <div className="binhluan m-4">
                           <div className="p-2">
                           <div className="flex items-center gap-2 ">
                                <img src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727111263/test/eidtlp8jtafefmgr3byp.jpg" alt="" 
                                className="w-14 h-14 rounded-full"
                                />
                               <div>
                               <p>name</p>
                               <div className=" px-1 chucvu">
                               <p> học viên</p>
                               </div>
                               </div>
                            </div>
                            <div>
                                <p>bài này hay quá mọi người ơi</p>
                            </div>
                            <div>
                            <ul className="flex">
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-solid fa-star" />
                                </li>
                                <li>
                                <i className="fa-sharp fa-regular fa-star" />
                                </li>
                            </ul>
                            </div>
                           </div>
                        </div>


                        {/* kết thúc bình luận */}
                       </div>
                        <div></div>
                    </div>
                </div>
                </div>
                <div >
                     <div className="name-course p-4 border">
                        <h6>khóa học lập trình python</h6>
                     </div>
                    <div className="overflow-y-scroll">
                    <div className="name-lesson flex items-center p-2 gap-4">
                           <div>
                           <i className="bi bi-check-square-fill"></i>
                           </div>
                           <div>
                            <p>Bài 1: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 danghoc">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>
                     <div className="name-lesson flex items-center p-2 gap-4 ">
                           <div>
                           <i className="bi bi-square"></i>
                           </div>
                           <div>
                            <p>Bài 2: jadj áida kád ák ádo </p>
                            <div className="flex gap-2">
                            <i className="bi bi-stopwatch-fill"></i>
                            <p>4 phút</p>
                            </div>
                           </div>
                     </div>

                    </div>
                </div>
            </div>
        </div>
    )
}