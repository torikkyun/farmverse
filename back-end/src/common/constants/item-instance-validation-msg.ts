export const ItemInstanceValidationMessages = {
  STATUS: {
    NOT_EMPTY: 'Trạng thái không được để trống',
    MUST_BE_ENUM:
      'Trạng thái phải là một trong các giá trị: GROWING, HARVESTED, CANCELED',
  },

  HARVESTED_ACTION: {
    NOT_EMPTY: 'Hành động thu hoạch không được để trống',
    MUST_BE_ENUM:
      'Hành động thu hoạch phải là một trong các giá trị: SELL_TO_FARMER, RECEIVE_PRODUCT',
  },

  HARVEST_PROCESS_STATUS: {
    NOT_EMPTY: 'Trạng thái quá trình thu hoạch không được để trống',
    MUST_BE_ENUM:
      'Trạng thái quá trình thu hoạch phải là một trong các giá trị: PENDING, HARVESTING, SUCCESS, COMPLETED, FAILED',
  },
};
