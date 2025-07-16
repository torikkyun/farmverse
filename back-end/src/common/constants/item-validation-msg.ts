import { N } from 'ethers';

export const ItemValidationMessages = {
  NAME: {
    NOT_EMPTY: 'Tên vật phẩm không được để trống',
    MUST_BE_STRING: 'Tên vật phẩm phải là chuỗi ký tự',
    MAX_LENGTH: 'Tên vật phẩm không được vượt quá 50 ký tự',
    MIN_LENGTH: 'Tên vật phẩm phải có ít nhất 2 ký tự',
  },
  TYPE: {
    NOT_EMPTY: 'Loại vật phẩm không được để trống',
    INVALID: 'Loại vật phẩm không hợp lệ',
    MUST_BE_STRING: 'Loại vật phẩm phải là chuỗi ký tự',
  },
  DESCRIPTION: {
    MAX_LENGTH: 'Mô tả vật phẩm không được vượt quá 500 ký tự',
    MUST_BE_STRING: 'Mô tả vật phẩm phải là chuỗi ký tự',
  },
  PRICE: {
    NOT_EMPTY: 'Giá vật phẩm không được để trống',
    MUST_BE_NUMBER: 'Giá vật phẩm phải là số',
    MIN_VALUE: 'Giá vật phẩm phải lớn hơn 0',
  },
  QUANTITY: {
    NOT_EMPTY: 'Số lượng vật phẩm không được để trống',
    MUST_BE_NUMBER: 'Số lượng vật phẩm phải là số',
    MIN_VALUE: 'Số lượng vật phẩm phải lớn hơn hoặc bằng 0',
  },
};
