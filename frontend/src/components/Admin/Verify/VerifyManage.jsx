import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterDropdown from "../../HomeProduct/Filter/FilterDropdown";
import FilterSort from "../../HomeProduct/Filter/FilterSort";
import useDebounce from "../../../Hook/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
const VerifyManage = () => {
    const { accessToken } = useSelector((state) => state.auth);
    const { units } = useSelector((state) => state.account);
    const listData = [
        { name: "Tất cả", value: "all" },
        { name: "Hợp tác xã", value: "HTX" },
        { name: "Doanh nghiệp", value: "DN" },
    ];
    const [filters, setFilters] = useState({
        search: "",
        newAdd: false,
        typeAccount: "all",
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPage: 1,
    });
    const totalPage = Math.ceil(pagination.totalRow / pagination.limit) || 1;
    const [query, setQuery] = useState("");
    const queryDebounce = useDebounce(query);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: "QTV_GET_UNITS",
            payload: {
                token: accessToken,
                query: queryString.stringify(filters),
            },
        });
    }, [filters]);
    useEffect(() => {
        setFilters((prev) => {
            return {
                ...prev,
                search: queryDebounce,
            };
        });
    }, [queryDebounce]);
    useEffect(() => {
        setPagination({ ...pagination, totalPage: units?.length });
    }, [units]);
    return (
        <>
            <div className="admin-account_filter flex items-center justify-center gap-10 mt-5 mb-9 animate__animated animate__fadeIn">
                <div className="tool-search w-[300px] p-1 border-2 border-primary-color rounded-lg flex gap-2">
                    <input
                        type="text"
                        className="outline-none flex-1 ml-2"
                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                    />
                    <button className="outline-none bg-primary-color px-3 py-[1px] rounded-lg">
                        <i className="fa-solid fa-magnifying-glass text-white font-bold text-sm"></i>
                    </button>
                </div>
                <div className="tool-sort flex gap-10 items-center">
                    <p className="sort-title">Sắp xếp theo: </p>
                    <FilterSort
                        type={{ name: "Mới thêm", value: "new" }}
                        onHandleSort={() =>
                            setFilters((prev) => ({
                                ...prev,
                                newAdd: !prev.newAdd,
                            }))
                        }
                    ></FilterSort>
                    <FilterDropdown
                        title="Loại tài khoản"
                        iconTitle="fa-solid fa-chevron-down text-primary-color"
                        listData={listData}
                        setFilters={(value) => {
                            setFilters((prev) => {
                                return {
                                    ...prev,
                                    typeAccount: value,
                                };
                            });
                        }}
                    ></FilterDropdown>
                    <div className="tool-page flex items-center p-1">
                        <button
                            className="px-2 py-1 border-2 border-primary-color rounded-xl h-full"
                            disabled={pagination.page === 1}
                            onClick={() => {
                                setPagination((prev) => ({
                                    ...prev,
                                    page: pagination.page - 1,
                                }));
                            }}
                        >
                            <i className="fa-solid fa-angle-left text-primary-color"></i>
                        </button>
                        <span className="mx-2">
                            {pagination.page} / {totalPage}
                        </span>
                        <button
                            className="px-2 py-1 border-2 border-primary-color rounded-xl h-full"
                            disabled={pagination.page === totalPage}
                            onClick={() => {
                                setPagination((prev) => ({
                                    ...prev,
                                    page: pagination.page - 1,
                                }));
                            }}
                        >
                            <i className="fa-solid fa-angle-right text-primary-color"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="account-list grid grid-cols-10  gap-4 h-[500px] overflow-y-scroll p-2">
                {units?.length > 0
                    ? units
                          .slice(
                              pagination.page * 10 - 10,
                              pagination.page * 10
                          )
                          .map((unit, index) => (
                              <Link
                                  to={`/xac_minh/chi_tiet/${unit.DV_MaDV}`}
                                  className="account col-span-2  rounded-lg box-shadow-custom  cursor-pointer overflow-hidden h-[235px]"
                                  key={unit.DV_MaDV}
                              >
                                  <div className="account-avatar h-[75%]">
                                      <img
                                          src={
                                              unit.DV_Logo ||
                                              "https://res.cloudinary.com/dszjsaro8/image/upload/v1678934807/coobus/Logo_pikttr.png"
                                          }
                                          alt=""
                                          className="h-full w-full object-contain"
                                      />
                                  </div>
                                  <div className="account-info py-[2px] px-1 text-center">
                                      <div className="account-info--header font-bold text-lg">
                                          {unit.DV_TenDonVi}
                                      </div>
                                      <div className="account-info-footer flex justify-between px-2">
                                          <span>{unit.DV_MaDV}</span>
                                          <span>{unit.LDV_MaLDV}</span>
                                      </div>
                                  </div>
                              </Link>
                          ))
                    : null}
            </div>
        </>
    );
};

export default VerifyManage;
