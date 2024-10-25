
import { Component, ViewChild } from '@angular/core';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificateData } from './certificate/certificate.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CertificateComponent],
  template: `
    <div class="container">
      <app-certificate 
        [data]="certificateData" 
        [customCss]="customStyles"
        #certificateComponent>
      </app-certificate>
      
      <button (click)="certificateComponent.generatePDF()">
        Generar PDF
      </button>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 20px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class AppComponent {
  // @ViewChild('certificateComponent') certificateComponent : CertificateComponent;
constructor (){}

  // generarcerti(){
  //   certificateComponent.generatePDF()
  // }
  customStyles = {
    'background-color': '#f5f5f5',
    'font-family': '"Times New Roman", serif'
  };

  certificateData: CertificateData = {
    title: 'Certificado de Excelencia',
    recipientName: 'Juan Pérez',
    date: '15 de Marzo de 2024',
    signatures: [
      {
        name: 'Dr. María García',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      },
      {
        name: 'Ing. Carlos López',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      }
    ]
  };
}