export const UserValidationMessages = {
  EMAIL: {
    NOT_EMPTY: 'Email không được để trống',
    INVALID_FORMAT: 'Email không đúng định dạng',
  },
  PASSWORD: {
    NOT_EMPTY: 'Mật khẩu không được để trống',
    MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự',
    MAX_LENGTH: 'Mật khẩu không được vượt quá 15 ký tự',
    MUST_BE_STRING: 'Mật khẩu phải là chuỗi ký tự',
  },
  NAME: {
    NOT_EMPTY: 'Tên không được để trống',
    MUST_BE_STRING: 'Tên phải là chuỗi ký tự',
    MAX_LENGTH: 'Tên không được vượt quá 50 ký tự',
    MIN_LENGTH: 'Tên phải có ít nhất 2 ký tự',
  },
  PHONE: {
    MAX_LENGTH: 'Số điện thoại không được vượt quá 15 ký tự',
    MIN_LENGTH: 'Số điện thoại phải có ít nhất 10 ký tự',
    MUST_BE_STRING: 'Số điện thoại phải là chuỗi ký tự',
  },
  ROLE: {
    INVALID: 'Vai trò không hợp lệ',
    NOT_EMPTY: 'Vai trò không được để trống',
    MUST_BE_STRING: 'Vai trò phải là chuỗi ký tự',
  },
  AVATAR: {
    MUST_BE_URL: 'Đường dẫn hình đại diện phải là URL hợp lệ',
    MUST_BE_STRING: 'Đường dẫn hình đại diện phải là chuỗi ký tự',
  },
  OTP: {
    NOT_EMPTY: 'Mã OTP không được để trống',
    MUST_BE_STRING: 'Mã OTP phải là chuỗi ký tự',
    LENGTH: 'Mã OTP phải có đúng 6 ký tự',
  },
};
