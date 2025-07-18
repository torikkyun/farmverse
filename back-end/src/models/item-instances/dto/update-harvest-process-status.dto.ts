import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { HarvestProcessStatus } from 'generated/prisma';
import { ItemInstanceValidationMessages } from 'src/common/constants/item-instance-validation-msg';

export class UpdateHarvestProcessStatusDto {
  @IsEnum(HarvestProcessStatus, {
    message: ItemInstanceValidationMessages.HARVEST_PROCESS_STATUS.MUST_BE_ENUM,
  })
  @IsNotEmpty({
    message: ItemInstanceValidationMessages.HARVEST_PROCESS_STATUS.NOT_EMPTY,
  })
  @ApiProperty({ required: true, enum: HarvestProcessStatus })
  harvestProcessStatus: HarvestProcessStatus;
}
