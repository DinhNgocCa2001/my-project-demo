/* eslint-disable camelcase */
import { atom } from "recoil";

export const refreshData = atom({
  key: "refreshData",
});

// const currentDate = new Date();
// const currentYear = currentDate.getFullYear();
// const currentMonth = currentDate.getMonth() + 1;

// export const atom_kyBaoCao = atom<{
// }>({
//   key: "atom_kyBaoCao",
//   default: {
//     year: currentYear,
//     month: currentMonth,
//   },
// });

// export const hienThiUploadFileOnModalForm = atom({
//   key: "hienThiUploadFileOnModalForm",
//   default: false,
// });

// export const hienThiSimoUserAuthorizationModal = atom({
//   key: "hienThiSimoUserAuthorizationModal",
//   default: false,
// });

// export const hienThiSimoLichSuTruyCapModal = atom({
//   key: "hienThiSimoLichSuTruyCapModal",
//   default: false,
// });

// export const hienThiSimoLichSuThaoTacModal = atom({
//   key: "hienThiSimoLichSuThaoTacModal",
//   default: false,
// });

// export const hienThiSimoAddNewListOfOrganizationsModal = atom({
//   key: "hienThiSimoAddNewListOfOrganizationsModal",
//   default: false,
// });

// export const atomFilter_XuLyBaoCaoDanhSachTKTT = atom<{

// }>({
//   key: "atomFilter_XuLyBaoCaoDanhSachTKTT",
//   default: {
//     toNgayDayFile: "",
//     fromNgayDayFile: "",
//     trangThaiXuLy: "",
//     toNgayXuLy: "",
//     fromNgayXuLy: "",
//     tenFile: "",
//     kenhDayFile: "",
//     thoiDiemXuLy: "",
//     kyBaoCao: "",
//     tctdId: "",
//     thangBaoCao: "",
//     namBaoCao: "",
//   },
// });

// export const atomFilter_XuLyBaoCaoDanhSachVDT = atom<{
// }>({
//   key: "atomFilter_XuLyBaoCaoDanhSachVDT",
//   default: {},
// });

// export const atomFilter_QuanHeCif0Cif1 = atom<{
// }>({
//   key: "atomFilter_QuanHeCif0Cif1",
//   default: {
//     cif1: "",
//     soId: "",
//     loaiId: "",
//     tenKhachHang: "",
//     loaiKhachHang: "",
//   },
// });

// export const atomFilter_GanNhanThuCongDuLieu = atom<{
// }>({
//   key: "atomFilter_GanNhanThuCongDuLieu",
//   default: {
//     phanLoai: "",
//     cif0: "",
//     idTkttOrVdt: "",
//     tenKhachHang: "",
//     tctdId: "",
//     trangThai: "",
//     nghiNgo: "",
//   },
// });

// export const atomFilter_KetQuaChayBatch = atom<{
// }>({
//   key: "atomFilter_KetQuaChayBatch",
//   default: {
//     fromTime: "",
//     toTime: "",
//   },
// });

// export const atomDetail_Tktt = atom<{
// }>({
//   key: "atomDetail_Tktt",
//   default: {},
// });

// export const atomDataTCTD = atom<{
// }>({
//   key: "atomDataTCTD",
//   default: {},
// });

// export const atomDataCauHinhThamSo = atom<{
// }>({
//   key: "atomDataCauHinhThamSo",
//   default: {},
// });

// export const atomDataCauHinhBatch = atom<{
// }>({
//   key: "atomDataCauHinhBatch",
//   default: {},
// });

export const atom_cart = atom({
  key: "atom_cart",
  default: [],
});

export const atom_dataProduct = atom({
  key: "atom_dataProduct",
  default: [],
});
