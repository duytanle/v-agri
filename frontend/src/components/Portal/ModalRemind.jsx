import React from "react";
import Modal from "./Modal";

const ModalRemind = ({ openModal, setOpenModal, onLogout }) => {
    return (
        <Modal
            visible={openModal}
            bodyClassName="z-10 bg-white rounded-lg max-w-[450px] w-full h-[250px] border-l-[10px] border-l-[#FFEA20]"
            onClose={() => setOpenModal("")}
        >
            <div className="flex flex-col gap-6 justify-center items-center">
                <div className="icon text-center my-3">
                    <i className="fa-solid fa-triangle-exclamation font-bold text-[80px] text-[#FFEA20]"></i>
                </div>
                <div className="text-remind font-bold text-xl">
                    Bạn có muốn đăng xuất?
                </div>
                <div className="verify flex justify-center gap-[50px]">
                    <div
                        className="min-w-[100px] bg-secondary-color rounded-lg text-white text-center font-bold py-2 text-lg cursor-pointer"
                        onClick={() => setOpenModal("")}
                    >
                        Không
                    </div>
                    <div
                        className="min-w-[100px] bg-primary-color rounded-lg text-white text-center font-bold py-2 text-lg cursor-pointer"
                        onClick={onLogout}
                    >
                        Có
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalRemind;
