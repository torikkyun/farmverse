import { Controller } from '@nestjs/common';
import { IotDataService } from './iot-data.service';

@Controller('iot-data')
export class IotDataController {
  constructor(private readonly iotDataService: IotDataService) {}
}
