export const FarmValidationMessages = {
  NAME: {
    NOT_EMPTY: 'Tên trang trại không được để trống',
    MUST_BE_STRING: 'Tên trang trại phải là chuỗi ký tự',
    MAX_LENGTH: 'Tên trang trại không được vượt quá 50 ký tự',
    MIN_LENGTH: 'Tên trang trại phải có ít nhất 2 ký tự',
  },
  LOCATION: {
    NOT_EMPTY: 'Vị trí trang trại không được để trống',
    MUST_BE_STRING: 'Vị trí trang trại phải là chuỗi ký tự',
    MAX_LENGTH: 'Vị trí trang trại không được vượt quá 100 ký tự',
    MIN_LENGTH: 'Vị trí trang trại phải có ít nhất 5 ký tự',
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
