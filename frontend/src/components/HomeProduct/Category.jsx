import React from "react";
const Category = () => {
    return (
        <div className="categories">
            <p className="title text-xl font-bold my-4">Danh mục sản phẩm</p>
            <div className="mt-5">
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/star.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">Nổi bật</span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/fruits.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">Trái cây</span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/vegetable.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">
                        Rau củ quả, Hạt
                    </span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/flower.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">Hoa</span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/rice.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">Lương thực</span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/milk.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">
                        Thịt, Trứng, Sữa
                    </span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/fish.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">Thủy, Hải sản</span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/forest.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">Lâm sản</span>
                </div>
                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/essential-oil.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">
                        Tinh dầu, Dược liệu
                    </span>
                </div>

                <div className="category-item flex items-center py-2">
                    <img
                        src="/images/seeds.png"
                        alt="Nổi bật"
                        className="category-img w-6 h-6 mr-6"
                    />
                    <span className="category-text text-lg">
                        Sản xuất giống
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Category;
