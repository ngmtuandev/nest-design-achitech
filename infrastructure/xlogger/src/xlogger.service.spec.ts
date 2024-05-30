import { Test, TestingModule } from '@nestjs/testing';
import { XloggerService } from './xlogger.service';

describe('XloggerService', () => {
  let service: XloggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XloggerService],
    }).compile();

    service = module.get<XloggerService>(XloggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
