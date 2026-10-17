import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cafeterias } from './cafeterias';

describe('Cafeterias', () => {
  let component: Cafeterias;
  let fixture: ComponentFixture<Cafeterias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cafeterias],
    }).compileComponents();

    fixture = TestBed.createComponent(Cafeterias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
