import EmployeeAvatar from "./EmployeeAvatar";
import Input from "../../CustomForm/Input";
import Dropdown from "../../CustomForm/Dropdown";
const EmployeeCE = ({
    defaultAvatar = "",
    control,
    setValue,
    errors,
    children,
}) => {
    return (
        <form className="grid grid-cols-7 gap-10 h-full">
            <EmployeeAvatar
                control={control}
                customClass="col-span-3  h-[300px] my-auto p-4 w-full bg-white flex-shrink-0"
                setValue={setValue}
                name="empAvatar"
                id="empAvatar"
                defaultAvatar={
                    defaultAvatar
                        ? defaultAvatar
                        : "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                }
            ></EmployeeAvatar>
            <div
                className={`emp-basic col-span-4 my-auto ${
                    Object.keys(errors).length > 0 ? "[&>*]:mb-3" : "[&>*]:mb-5"
                }`}
            >
                <div className="emp-id items-center grid grid-cols-8">
                    <label htmlFor="empId" className="flex-shrink-0 col-span-3">
                        Mã nhân viên:
                    </label>
                    <div className="emp-id-input col-span-5 flex gap-1 border-2 border-primary-color rounded-lg p-1 overflow-hidden">
                        <div className="bg-gray-200 rounded-lg flex-shrink-0  text-center font-bold p-1">
                            HGIPH-22002
                        </div>
                        <Input
                            id="empId"
                            name="empId"
                            control={control}
                            customClass="p-1 flex-1 w-[50%] rounded-lg"
                        ></Input>
                    </div>
                    {errors.empId ? (
                        <>
                            <p className="col-span-3"></p>
                            <p className="col-span-5 text-sm text-red-700">
                                {errors.empId.message}
                            </p>
                        </>
                    ) : null}
                </div>

                <div className="emp-name  items-center grid grid-cols-8">
                    <label htmlFor="empName" className="col-span-3">
                        Tên nhân viên:
                    </label>
                    <Input
                        type="text"
                        id="empName"
                        name="empName"
                        control={control}
                        customClass="col-span-5 border-2 border-primary-color flex-1 p-2 rounded-lg"
                    ></Input>
                    {errors.empName ? (
                        <>
                            <p className="col-span-3"></p>
                            <p className="col-span-5 text-sm text-red-700">
                                {errors.empName.message}
                            </p>
                        </>
                    ) : null}
                </div>
                <div className="emp-account  items-center grid grid-cols-8">
                    <label htmlFor="empAccount" className="col-span-3">
                        Tên đăng nhập:
                    </label>
                    <Input
                        type="text"
                        id="empAccount"
                        name="empAccount"
                        control={control}
                        customClass="col-span-5 border-2 border-primary-color flex-1 p-2 rounded-lg"
                    ></Input>
                    {errors.empAccount ? (
                        <>
                            <p className="col-span-3"></p>
                            <p className="col-span-5 text-sm text-red-700">
                                {errors.empAccount.message}
                            </p>
                        </>
                    ) : null}
                </div>
                <div className="emp-password  items-center grid grid-cols-8">
                    <label htmlFor="empPassword" className="col-span-3">
                        Mật khẩu:
                    </label>
                    <Input
                        type="password"
                        id="empPassword"
                        name="empPassword"
                        control={control}
                        customClass="border-2 border-primary-color flex-1 p-2 col-span-5 rounded-lg"
                    ></Input>
                    {errors.empPassword ? (
                        <>
                            <p className="col-span-3"></p>
                            <p className="col-span-5 text-sm text-red-700">
                                {errors.empPassword.message}
                            </p>
                        </>
                    ) : null}
                </div>
                <div className="emp-position  items-center grid grid-cols-8">
                    <label htmlFor="empPosition" className="col-span-3">
                        Vị trí làm việc:
                    </label>
                    <Dropdown
                        control={control}
                        labelDefault="Vị trí làm việc"
                        setValue={setValue}
                        name="empPosition"
                        dropdownData={[
                            {
                                name: "Chọn vị trí",
                                value: "default",
                            },
                            {
                                name: "Quản lý sản phẩm",
                                value: "manage-product",
                            },
                            {
                                name: "Quản lý đơn hàng",
                                value: "manage-order",
                            },
                        ]}
                        customClass="col-span-5"
                        customTitle="p-2"
                    ></Dropdown>
                    {errors.empPosition ? (
                        <>
                            <p className="col-span-3"></p>
                            <p className="col-span-5 text-sm text-red-700">
                                {errors.empPosition.message}
                            </p>
                        </>
                    ) : null}
                </div>
                <div className="button grid grid-cols-8">
                    <div className="col-span-3"></div>
                    <div className="col-span-5 flex justify-between">
                        {children}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EmployeeCE;
