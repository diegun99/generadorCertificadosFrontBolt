
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CertificateData } from './certificate.interface';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #certificateContainer [id]="'certificate-' + id" class="certificate-container" [ngStyle]="customCss">
      <div class="certificate" [ngStyle]="{'background-image': backgroundImageUrl}">
        <h1>{{data.title}}</h1>
        <h2>{{data.recipientName}}</h2>
        <div class="date">{{data.date}}</div>
        
        <div class="signatures">
          @for (signature of data.signatures; track signature.name) {
            <div class="signature">
              <img [src]="signature.image" [alt]="signature.name">
              <p>{{signature.name}}</p>
            </div>
          }
        </div>
      </div>
    </div>
    <button (click)="generatePDF()">
        Generar PDF
      </button>
    
  `,
  styles: [`
    .certificate-container {
      padding: 20px;
      width: 800px;
      height: 600px;
    }
    
    .certificate {
      width: 90%;
      height: 85%;
      padding: 40px;
      background-size: cover;
      background-position: center;
      position: relative;
      border: 2px solid #000;
    }

    h1 {
      text-align: center;
      font-size: 36px;
      margin-bottom: 40px;
    }

    h2 {
      text-align: center;
      font-size: 28px;
      margin: 20px 0;
    }

    .date {
      text-align: center;
      font-size: 18px;
      margin: 20px 0;
    }

    .signatures {
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 40px;
      left: 0;
      right: 0;
    }

    .signature {
      text-align: center;
    }

    .signature img {
      max-width: 150px;
      max-height: 60px;
    }

    .signature p {
      margin-top: 10px;
      font-size: 14px;
    }
  `]
})
export class CertificateComponent {
  @Input() data!: CertificateData;
  @Input() customCss: { [key: string]: string } = {};
  @Input() id: string = 'default';

  @ViewChild('certificateContainer') certificateContainer!: ElementRef;

  get backgroundImageUrl(): string {
    return this.data.backgroundImage ? `url(${this.data.backgroundImage})` : 'none';
  }

  async generatePDF(): Promise<void> {

    debugger
    try {
      const element = this.certificateContainer.nativeElement;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`certificate-${this.data.recipientName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}