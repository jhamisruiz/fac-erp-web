import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataFile } from './app-input-file.interface';

@Component({
  selector: 'app-input-file',
  templateUrl: './app-input-file.component.html',
  styleUrls: ['./app-input-file.component.scss'],
})
export class AppInputFileComponent implements OnInit {

  /**
   * @DataFile DataFile
   */
  @Input() set setDataFile(d: DataFile | undefined) {
    if (d?.nombre) {
      this.dataFile = d;
    }
  }

  @Input() styleClass: string | undefined;
  @Input() class: string | undefined;
  @Input() style: string | undefined | any;

  @Input() labelStyle: string | undefined;
  @Input() labelClass: string | undefined;

  @Input() inputClass: string | undefined;
  @Input() inputStyle: string | undefined;
  @Input() label: any;
  @Input() required = false;
  @Input() multiple = false;
  @Input() accept = '*.*';
  @Output() NgModelResponse = new EventEmitter<any>();

  initRequired = false;
  dataFile!: DataFile | null;
  constructor() { }

  ngOnInit(): void {
    if (1) { }
  }

  onFileChange(e: any): void {
    if (e.target.files && e.target.files.length) {
      const files: any[] = e.target.files;
      Array.from(e.target.files).forEach((v, i) => {
        const f = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (): void => {
          let result = '';
          result = reader.result as string;
          this.dataFile = {
            id: i,
            data: result,
            nombre: f.name,
            create: true,
          };
          this.NgModelResponse.emit(this.dataFile);
        };
      });
    }
  }

  deleteFile(): void {
    this.dataFile = null;
    this.NgModelResponse.emit(this.dataFile);
  }
}
