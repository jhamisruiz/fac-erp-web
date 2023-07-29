import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LOGIN_API_PATH } from '@app/shared/constantes/app.constantes';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
})

export class AppLoginComponent implements OnInit, OnDestroy {

  public errorMessage = '';

  submit = false;
  hide = true;
  value3 = '';
  testarray: any = [];
  valuex: any = '';
  showpass = true;

  err: any;

  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
  ) {

    this.form = this.fb.group({
      username: ['kalva', [Validators.required]],//45909624
      password: [123, [Validators.required]],//123
    });
  }

  ngOnInit(): void {
    if (1) {

    }
  }

  onShowPass(): void {
    this.showpass = this.showpass ? false : true;
  }

  ngSubmita(): void {
    this.errorMessage = '';
    this.submit = true;
    //this.btnloading!.start();

    this.http.get(`${LOGIN_API_PATH}/${this.form.value.username}/${this.form.value.password}`)
      .pipe(
        finalize(() => {
          this.submit = false;
        }),
        //takeUntil(this.destroy$)
      )
      .subscribe({
        error: err => {
          this.submit = false;
          this.err = err;
        },

      },
      );
  }

  ngSubmit(): void {
    this.errorMessage = '';
    this.submit = true;

    // Prepare the request body with the username and password
    const requestBody = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.http.post(`${LOGIN_API_PATH}`, requestBody) // Use http.post instead of http.get
      .pipe(
        finalize(() => {
          this.submit = false;
        }),
        //takeUntil(this.destroy$)
      )
      .subscribe({
        error: (err) => {
          this.submit = false;
          this.err = err;
          const message = String(err?.message ?? '').replace(/\(#([0-9]+)\)/, err?.help ? `<a href="${err.help}">(#$1)</a>` : '(#$1)');
          this.errorMessage = message;
        },

        next: (response) => {
          // Do something with the response
        },
      });
  }


  ngOnDestroy(): void {
    this.errorMessage = '';
    this.submit = false;

    if (1) { }
  }

}
