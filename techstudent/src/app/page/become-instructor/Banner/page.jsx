import React from 'react'

export default function page() {
    return (
        <>

            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb-main-wrapper">
                        <h1 className="title">Become an Instructor</h1>
                        {/* breadcrumb pagination area */}
                        <div className="pagination-wrapper">
                            <a href="index.html">Home</a>
                            <i className="fa-regular fa-chevron-right"></i>
                            <a className="active" href="become-instructor.html">Become an Instructor</a>
                        </div>
                        {/* breadcrumb pagination area end */}
                    </div>
                </div>
            </div>

        </>
    )
}
