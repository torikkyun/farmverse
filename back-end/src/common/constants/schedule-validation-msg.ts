export const ScheduleValidationMessages = {
  NAME: {
    NOT_EMPTY: 'Tên lịch trình không được để trống',
    MUST_BE_STRING: 'Tên lịch trình phải là chuỗi ký tự',
    MAX_LENGTH: 'Tên lịch trình không được vượt quá 50 ký tự',
    MIN_LENGTH: 'Tên lịch trình phải có ít nhất 2 ký tự',
  },
  DESCRIPTION: {
    MUST_BE_STRING: 'Mô tả lịch trình phải là chuỗi ký tự',
    MAX_LENGTH: 'Mô tả lịch trình không được vượt quá 500 ký tự',
  },
  START_TIME: {
    NOT_EMPTY: 'Thời gian bắt đầu không được để trống',
    MUST_BE_DATE: 'Thời gian bắt đầu phải là kiểu ngày hợp lệ',
  },
  END_TIME: {
    NOT_EMPTY: 'Thời gian kết thúc không được để trống',
    MUST_BE_DATE: 'Thời gian kết thúc phải là kiểu ngày hợp lệ',
  },
  STATUS: {
    MUST_BE_BOOLEAN: 'Trạng thái phải là kiểu boolean',
  },
};
