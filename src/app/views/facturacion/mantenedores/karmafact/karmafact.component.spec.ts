/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KarmafactComponent } from './karmafact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('KarmafactComponent', () => {
  let component: KarmafactComponent;
  let fixture: ComponentFixture<KarmafactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
      ],
      declarations: [KarmafactComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KarmafactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'AngularTestCode'`, () => {
    const fixture = TestBed.createComponent(KarmafactComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('RudraTech2014');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(KarmafactComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('RudraTech2014 app is running!');
  });

  xit(`should have as title 'RudraTech2014'`, () => {
    const fixture = TestBed.createComponent(KarmafactComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('RudraTech2014');
  });

});
