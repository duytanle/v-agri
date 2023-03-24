import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomeProduct from "./pages/HomeProduct";
import {
    authGetUserUnit,
    authRefreshToken,
    authUpdateUser,
} from "./store/auth/auth-slice";
import { getToken, logOut } from "./utils/auth.js";
import { addressGet } from "./store/address/address-slice";
import {
    productGetCategory,
    productGetProducts,
    productUpdateCurrentProducts,
} from "./store/products/product-slice";
import AlanAI from "./components/AlanAI/AlanAI";

const Header = lazy(() => import("./components/Header/Header.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const OrderProduct = lazy(() => import("./pages/OrderProduct.jsx"));
const UnitDetail = lazy(() => import("./pages/UnitDetail.jsx"));
const UnitManage = lazy(() => import("./pages/UnitManage.jsx"));
const Dashboard = lazy(() => import("./components/UnitManage/Dashboard"));
const ManageProduct = lazy(() =>
    import("./components/UnitManage/ManageProduct.jsx")
);
const Admin = lazy(() => import("./pages/Admin.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));
const AdminAccount = lazy(() => import("./components/Admin/AdminAccount.jsx"));
const AccountManage = lazy(() =>
    import("./components/Admin/Account/AccountManage.jsx")
);
const AccountDetail = lazy(() =>
    import("./components/Admin/Account/AccountDetail.jsx")
);
const AdminVerify = lazy(() => import("./components/Admin/AdminVerify.jsx"));
const VerifyManage = lazy(() =>
    import("./components/Admin/Verify/VerifyManage.jsx")
);
const VerifyDetail = lazy(() =>
    import("./components/Admin/Verify/VerifyDetail.jsx")
);
const AdminPost = lazy(() => import("./pages/AdmindPost.jsx"));
const AdPostDashboard = lazy(() =>
    import("./components/AdminPost/AdPostDashboard.jsx")
);
const AdPostProduct = lazy(() =>
    import("./components/AdminPost/AdPostProduct.jsx")
);
const AdPostReport = lazy(() =>
    import("./components/AdminPost/AdPostReport.jsx")
);
const Chat = lazy(() => import("./components/UnitManage/Chat.jsx"));
const Announce = lazy(() => import("./components/UnitManage/Announce.jsx"));
const Employees = lazy(() => import("./components/UnitManage/Employees.jsx"));
const Setting = lazy(() => import("./components/UnitManage/Setting.jsx"));
const Order = lazy(() => import("./components/UnitManage/Order.jsx"));
const OrderManage = lazy(() =>
    import("./components/UnitManage/Order/OrderManage.jsx")
);
const OrderDetail = lazy(() =>
    import("./components/UnitManage/Order/OrderDetail.jsx")
);
const Cart = lazy(() => import("./components/UnitManage/Cart.jsx"));
const Intro = lazy(() => import("./components/UnitManage/Intro.jsx"));
function App() {
    const { user, accessToken } = useSelector((state) => state.auth);
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && user.ND_MaND) {
            const { access_token } = getToken();
            dispatch(
                authUpdateUser({
                    user,
                    accessToken: access_token,
                })
            );
            if (user.LND_MaLND === "HTX" || user.LND_MaLND === "DN") {
                dispatch(authGetUserUnit(accessToken));
            }
        } else {
            const { refresh_token } = getToken();

            if (refresh_token) {
                dispatch(authRefreshToken(refresh_token));
            } else {
                dispatch(authUpdateUser({}));
                logOut();
            }
        }
    }, [user, dispatch]);
    useEffect(() => {
        dispatch(addressGet());
        dispatch(productGetCategory());
        dispatch(productGetProducts());
    }, []);
    useEffect(() => {
        if (user?.LND_MaLND === "HTX" || user?.LND_MaLND === "DN") {
            const filterProduct = products?.filter((product) => {
                if (user?.LND_MaLND === "HTX")
                    return product.LSP_MaLSP === "DN";
                else return product.LSP_MaLSP === "HTX";
            });
            dispatch(
                productUpdateCurrentProducts({ currentProducts: filterProduct })
            );
            if (user?.LND_MaLND === "DN") {
                dispatch({ type: "GET_CART", payload: accessToken });
            }
        } else {
            dispatch(
                productUpdateCurrentProducts({ currentProducts: products })
            );
        }
    }, [products, user]);
    const checkUserType = () => {
        let renderCPN = <HomeProduct />;
        if (user) {
            switch (user.LND_MaLND) {
                case "QTV":
                    renderCPN = <Admin />;
                    break;
                case "QTVBD":
                    renderCPN = <AdminPost />;
                    break;
                default:
                    renderCPN = <HomeProduct />;
                    break;
            }
        }
        return renderCPN;
    };
    return (
        <>
            <ToastContainer style={{ zIndex: 9999 }}></ToastContainer>
            <Header></Header>
            <AlanAI></AlanAI>
            <Suspense>
                <Routes>
                    <Route path="/" element={checkUserType()}>
                        {user && user.LND_MaLND === "QTV" && (
                            <>
                                <Route
                                    path="/"
                                    element={<AdminDashboard></AdminDashboard>}
                                ></Route>
                                <Route
                                    path="/tai_khoan"
                                    element={<AdminAccount></AdminAccount>}
                                >
                                    <Route
                                        path=""
                                        element={
                                            <AccountManage></AccountManage>
                                        }
                                    ></Route>
                                    <Route
                                        path="/tai_khoan/chi_tiet/:id"
                                        element={
                                            <AccountDetail></AccountDetail>
                                        }
                                    ></Route>
                                </Route>
                                <Route
                                    path="/xac_minh"
                                    element={<AdminVerify></AdminVerify>}
                                >
                                    <Route
                                        path=""
                                        element={<VerifyManage></VerifyManage>}
                                    ></Route>
                                    <Route
                                        path="/xac_minh/chi_tiet/:id"
                                        element={<VerifyDetail></VerifyDetail>}
                                    ></Route>
                                </Route>
                                <Route
                                    path="/thong_bao"
                                    element={<Announce></Announce>}
                                ></Route>
                            </>
                        )}
                        {user && user.LND_MaLND === "QTVBD" && (
                            <>
                                <Route
                                    path=""
                                    element={<AdPostDashboard />}
                                ></Route>
                                <Route
                                    path="/bai_dang"
                                    element={<AdPostProduct />}
                                ></Route>
                                <Route
                                    path="/bao_cao"
                                    element={<AdPostReport />}
                                ></Route>
                                <Route
                                    path="/thong_bao"
                                    element={<Announce />}
                                ></Route>
                            </>
                        )}
                    </Route>
                    <Route
                        path="/chi_tiet_san_pham/:id"
                        element={<ProductDetail></ProductDetail>}
                    ></Route>
                    <Route
                        path="/don_vi/:id"
                        element={<UnitDetail></UnitDetail>}
                    ></Route>
                    {user ? (
                        user.LND_MaLND === "HTX" || user.LND_MaLND === "DN" ? (
                            <>
                                <Route
                                    path="/dat_hang"
                                    element={<OrderProduct></OrderProduct>}
                                ></Route>
                                <Route
                                    path="/quan_ly"
                                    element={<UnitManage></UnitManage>}
                                >
                                    <Route
                                        path=""
                                        element={<Dashboard></Dashboard>}
                                    ></Route>
                                    <Route
                                        path="san_pham"
                                        element={
                                            <ManageProduct></ManageProduct>
                                        }
                                    ></Route>
                                    <Route
                                        path="don_hang"
                                        element={<Order></Order>}
                                    >
                                        <Route
                                            path=""
                                            element={
                                                <OrderManage></OrderManage>
                                            }
                                        ></Route>
                                        <Route
                                            path="/quan_ly/don_hang/chi_tiet/:id"
                                            element={
                                                <OrderDetail></OrderDetail>
                                            }
                                        ></Route>
                                    </Route>
                                    <Route
                                        path="tin_nhan"
                                        element={<Chat></Chat>}
                                    ></Route>
                                    <Route
                                        path="gio_hang"
                                        element={<Cart></Cart>}
                                    ></Route>
                                    <Route
                                        path="chao_hang"
                                        element={<Intro></Intro>}
                                    ></Route>
                                    <Route
                                        path="thong_bao"
                                        element={<Announce></Announce>}
                                    ></Route>

                                    <Route
                                        path="canh_bao"
                                        element={<></>}
                                    ></Route>
                                    <Route
                                        path="nhan_vien"
                                        element={<Employees></Employees>}
                                    ></Route>
                                    <Route
                                        path="cai_dat"
                                        element={<Setting></Setting>}
                                    ></Route>
                                </Route>
                            </>
                        ) : null
                    ) : null}
                    {user && user.LND_MaLND === "QTV" ? (
                        <Route
                            path="/quan_tri"
                            element={<Admin></Admin>}
                        ></Route>
                    ) : null}
                    <Route path="*" element={<></>}></Route>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
