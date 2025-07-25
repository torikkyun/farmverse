export const FarmValidationMessages = {
  NAME: {
    NOT_EMPTY: 'Tên trang trại không được để trống',
    MUST_BE_STRING: 'Tên trang trại phải là chuỗi ký tự',
    MAX_LENGTH: 'Tên trang trại không được vượt quá 50 ký tự',
    MIN_LENGTH: 'Tên trang trại phải có ít nhất 2 ký tự',
  },
  ADDRESS: {
    NOT_EMPTY: 'Địa chỉ trang trại không được để trống',
  },
  SIZE: {
    NOT_EMPTY: 'Diện tích trang trại không được để trống',
    MUST_BE_NUMBER: 'Diện tích trang trại phải là số',
    MIN_VALUE: 'Diện tích trang trại phải lớn hơn 0',
  },
  DESCRIPTION: {
    MAX_LENGTH: 'Mô tả trang trại không được vượt quá 500 ký tự',
    MUST_BE_STRING: 'Mô tả trang trại phải là chuỗi ký tự',
  },
};
