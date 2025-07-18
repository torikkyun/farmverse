import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TreeRootInstanceStatus } from 'generated/prisma';
import { ItemInstanceValidationMessages } from 'src/common/constants/item-instance-validation-msg';

export class UpdateStatusDto {
  @IsNotEmpty({
    message: ItemInstanceValidationMessages.STATUS.NOT_EMPTY,
  })
  @IsEnum(TreeRootInstanceStatus, {
    message: ItemInstanceValidationMessages.STATUS.MUST_BE_ENUM,
  })
  @ApiProperty({
    required: true,
    enum: TreeRootInstanceStatus,
    description:
      'Trạng thái của vật phẩm bao gồm: GROWING, HARVESTED, CANCELED',
  })
  status: TreeRootInstanceStatus;
}
