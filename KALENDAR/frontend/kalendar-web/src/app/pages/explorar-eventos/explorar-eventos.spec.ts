import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarEventos } from './explorar-eventos';

describe('ExplorarEventos', () => {
  let component: ExplorarEventos;
  let fixture: ComponentFixture<ExplorarEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarEventos],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorarEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
