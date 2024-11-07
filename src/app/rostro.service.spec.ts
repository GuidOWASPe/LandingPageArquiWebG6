import { TestBed } from '@angular/core/testing';

import { RostroService } from './rostro.service';

describe('RostroService', () => {
  let service: RostroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RostroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
